import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
// lib(biblioteca) do supabase: Nosso back-end vai ser o supabase. Obs: a lib do supabase é feita com Typescript, ela facilita o trabalho da API supabase
import { createClient } from '@supabase/supabase-js';

// Chave da API supabase(nosso Backend as a Service ) NUNCA MOSTRAR CHAVES DE API
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI5NzUwMywiZXhwIjoxOTU4ODczNTAzfQ.5KbBTLrxHcWIK0Npw1NRuYfmhL06jG-o5NeF2pslUDE';
// Link do meu back-end
const SUPABASE_URL = 'https://zojfhopdngfkmssmisbo.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');

    //o useState padrão é um array vazio, porque não tem mensagem nem uma ainda
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    const user = appConfig.username

    const [loading, setLoading] = React.useState(false);

    // useEffect é para lidar com as coisas que fogem do fluxo padrão do componente. fluxo padrão  -> execução. Ter todos os valores na mão que bota no meio do return ele aparece, agora se o dado precisa vim de um servidor externo(precisa demorar um pouco pra acontecer) ele não faz parte do fluxo padrão, ele é um efeito colateral(uma coisa extra)
    //Isolado no useEffect: O efeito de bater no servidor, etc ta dentro do useEffect, então não vai ser toda vez que vai renderizar o chat page, porque agora esta dentro de algo que so renderiza em certos momentos, esses momentos são: na hora que a pagina carrega(padrão) e quando a lista de mensagens atualizar, então essa função so vai bater/requisitar o servidor quando carregar a pagina e quando a lista de mensagens atualizar. Obs: o listaDeMensagens dentro do array é para isso mesmo, pra falar que é so pra bater no servidor quando a lista de mensagem atualizar(mudar) porque o useEffect vai observar as mudanças do listaDeMensagens, com isso não vai rodar varias vezes, somente quando mudar
    React.useEffect(() => {
        // Usando a biblioteca do supabase, em vez de fazer na unha com o fetch, pra capturar as mensagens no servidor
        // Com o ponto from a gente passa o nome da tabela que foi criada no supabase, o select é o que a gente quer pegar, no caso tudo 
        const dadosDoSupabase = supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                // setListaDeMensagens(dados.data);
                setListaDeMensagens(data);
                setLoading(true);
            });
    }, [listaDeMensagens]);

    /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */

    //Aqui é uma função para enviar as mensagens usando map no MessageList 
    function handleNovaMensagem(novaMensagem) {
        const mensagemComposta = {
            // O id substitui o key da mensagem, dessa maneira o key não da erro no console e agora não é so uma mensagem, é uma mensagem composta/objeto
            // OBS: Vamos deixar pra pegar o id do servidor agora
            // id: listaDeMensagens.length + 1,
            de: user,
            texto: novaMensagem,
        };
        // Se a nova mensagem for um valor nulo e não tiver nada ele não envia a mensagem pra o box, que é uma mensagem composta: id, de e texto e a lista de mensagens que é um vetor de estado: ele apaga a mensagem do campo e envia essa mensagem do campo pra box e pro vetor
        if (novaMensagem.length !== null && novaMensagem.trim()) {
            // Aqui o supabase faz com que envie a mensagem
            supabaseClient
                .from('mensagens')
                .insert([
                    // Obs: TEM QUE SER UM OBJETO COM OS MESMOS CAMPOS QUE VOCE ESCREVEU NO SUPABASE, nesse caso a gente da um insert da mensagem composta no servidor que tem os mesmos campos da tabela no supabase: "de" e "texto"
                    mensagemComposta
                ])
                .then(({ data }) => {
                    setListaDeMensagens([
                        // mensagemComposta,
                        // A gente não da set na lista com o metodo mensagem composta direto do codigo, a mensagem agora é da data da posição 0 que tem todas as informações
                        data[0],
                        //pega o data com o restante das mensagens... -> PEGA TODOS OS ITENS QUE JA TEM DENTRO DA LISTA E ESPALHA DENTRO DA LISTA NOVA E O DA MENSAGEM
                        ...listaDeMensagens,
                    ]);

                });
            setMensagem('');
        }
    }
    // Aqui ele apaga a mensagem usando filter no MessageList, a exclusão funciona atraves do id da mensagem que tem na tabela do suprabase que foi enviada pelo usuario
    function handleDeleteMessage(id, mensagemDe) {
        if (user === mensagemDe) {
            supabaseClient
                .from('mensagens')
                .delete()
                .match({ id: id })
                .then(({ data }) => {
                    const listaDeMensagemFiltrada = listaDeMensagens.filter((messageFiltered) => {
                        return messageFiltered.id != data[0].id;
                    })
                    // Setando a nova lista filtrada, com uma mensagem a menos
                    setListaDeMensagens(listaDeMensagemFiltrada)
                    alert('mensagem excluida com sucesso :)')
                })
        } else {
            alert('APAGUE AS SUAS PROPIAS MENSAGENS >:[')
        }
    }

    if (loading === false) {
        return (
            <>
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img className='load' src='https://vignette.wikia.nocookie.net/leagueoflegends/images/e/e4/LoL_Facebook_Icon_14.gif/revision/latest?cb=20161029213743' />
                </Box>
            </>
        )
    }
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://images2.alphacoders.com/108/thumb-1920-1083864.png)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000'],
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: ' 0 0 5em rgb( 223, 184, 122)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',

                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        boxShadow: ' 0 0 0.1em rgb( 223, 184, 122)',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {/* Com o messagelist a gente separa os dados da mensagem, pra não dar erro ao enviar a mensagem, pois a mensagem é um objeto a onde ela esta armazenada no listaDeMensagens
                    mensagens(so um nome aleatorio) recebe a lista de mensagens que atraves do props a gente consegue manipular, mesma coisa pro deleteMessage
                    */}
                    <MessageList mensagens={listaDeMensagens} deleteMessage={handleDeleteMessage} />

                    {/* Map serve pra mapear as mensagens na lista de mensagens que serve de entrada pra uma nova saida padronizada*/}
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    // Sempre que tiver o enter a gente previne o comportamento padrão do enter que é a quebra de linha
                                    event.preventDefault();
                                    // Metodo pra nova mensgem
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '5px 5px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                fontSize: '18px'
                            }}
                        />
                        <Button
                            label='Enviar'
                            styleSheet={{
                                height: '60px',
                                borderRadius: '20%',
                                hover: {
                                    boxShadow: ' 0 0 2em rgb( 223, 184, 122)',
                                }
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.primary[1000],
                                mainColor: appConfig.theme.colors.primary["000"],
                                mainColorLight: appConfig.theme.colors.neutrals[800],
                                mainColorStrong: appConfig.theme.colors.neutrals[800],
                            }}
                            onClick={() => handleNovaMensagem(mensagem)}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

// Componente header feito por nos e não pela @skynexui/components
function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text
                    variant='heading5'
                    styleSheet={{
                        color: appConfig.theme.colors.primary[1000],
                    }}
                >
                    Chat
                </Text>
                <Image
                    styleSheet={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '5px',
                        border: '1px solid rgb( 223, 184, 122)'
                    }}
                    src={`https://github.com/${appConfig.username}.png`}
                />
                <Text
                    styleSheet={{
                        fontSize: '20px',
                        borderBottom: '1px solid rgb( 223, 184, 122)'
                    }}
                >
                    {appConfig.username}
                </Text>
                <Button
                    variant='tertiary'
                    label='Sair do chat'
                    href="/"
                    styleSheet={{
                        color: appConfig.theme.colors.primary[1000],
                        hover: {
                            boxShadow: ' 0 0 2em rgb( 223, 184, 122)',
                        }
                    }}
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.primary[1000],
                        mainColor: appConfig.theme.colors.primary["000"],
                        mainColorLight: appConfig.theme.colors.neutrals[800],
                        mainColorStrong: appConfig.theme.colors.neutrals[800],
                    }}

                />
            </Box>
        </>
    )
}

// Componente de mensagem nosso que é o componente que faz as mensagens aparecerem na tela
function MessageList(props) {
    // Essa variavel armazena a função de deletar a mensagem atraves do props, que no componente do MessageList é passado-> props.deleteMessage
    const handleDeleteMessage = props.deleteMessage
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',

            }}
        >
            {/* Aqui a gente não armazena, mas faz uma função que recebe uma lista de mensagens que foi gerada ao enviar uma mensagem pelo metodo handleNovaMensagem que armazena a mensgem no array e apaga a mesma mensagem no campo, com isso esse metodo abaixo mapeia(map) as mensagen armazenadas no lista de mensagens que tem o "id, de e o texto" */}
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[500],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text
                                tag="strong"
                            >
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Text
                                onClick={() => handleDeleteMessage(mensagem.id, mensagem.de)}
                                styleSheet={{
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    marginLeft: 'auto',
                                    color: appConfig.theme.colors.primary[1000],
                                    backgroundColor: '#fff',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.neutrals[800],
                                        boxShadow: ' 0 0 2em rgb( 223, 184, 122)',
                                    }
                                }}
                                tag="span"
                                data-id={mensagem.id}
                            >
                                X
                            </Text>
                        </Box>
                        <Text
                            styleSheet={{
                                borderBottom: '1px solid rgb( 223, 184, 122)',
                            }}>
                            {mensagem.texto}
                        </Text>
                    </Text>
                );
            })}
        </Box>
    )
}
