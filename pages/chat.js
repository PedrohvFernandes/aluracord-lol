import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');

    //o useState padrão é um array vazio, porque não tem mensagem nem uma ainda
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

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
        // O id substitui o key da mensagem, dessa maneira o key não da erro no console e agora não é so uma mensagem, é uma mensagem composta/objeto
        const mensagemComposta = {
            id: listaDeMensagens.length + 1,
            de: 'PedrohvFernandes',
            texto: novaMensagem,
        };
        // Se a nova mensagem for um valor nulo e não tiver nada ele não envia a mensagem pra o box, que é uma mensagem composta: id, de e texto e a lista de mensagens que é um vetor de estado: ele apaga a mensagem do campo e envia essa mensagem do campo pra box e pro vetor
        if (novaMensagem.length !== null && novaMensagem.trim()) {
            setListaDeMensagens([
                // A nova mensagem que a gente quer passar
                mensagemComposta,
                // mais as antigas mensagens, ... -> PEGA TODOS OS ITENS QUE JA TEM DENTRO DA LISTA E ESPALHA DENTRO DA LISTA NOVA E O DA MENSAGEM
                ...listaDeMensagens,
            ]);
        }
        setMensagem('');
    }

    // Aqui ele apaga a mensagem usando filter no MessageList, a exclusão funciona atraves do id da mensagem que tem no array
    function handleDeleteMessage(event) {
        const messageId = Number(event.target.dataset.id)
        const listaDeMensagemFiltrada = listaDeMensagens.filter((messageFiltered) => {
            return messageFiltered.id != messageId
        })

        // Setando a nova lista filtrada, com uma mensagem a menos
        setListaDeMensagens(listaDeMensagemFiltrada)
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
                    maxWidth: '55%',
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
                                padding: '6px 8px',
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
                                contrastColor: 'rgb(223, 184, 122)',
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
                        color: 'rgb(223, 184, 122)'
                    }}
                >
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    label='Sair do chat'
                    href="/"
                    styleSheet={{
                        color: 'rgb(223, 184, 122)',
                        hover: {
                            boxShadow: ' 0 0 2em rgb( 223, 184, 122)',
                        }
                    }}
                    buttonColors={{
                        contrastColor: 'rgb(223, 184, 122)',
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
                                src={`https://github.com/pedrohvfernandes.png`}
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
                                onClick={handleDeleteMessage}
                                styleSheet={{
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    marginLeft: 'auto',
                                    color: 'rgb( 223, 184, 122)',
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