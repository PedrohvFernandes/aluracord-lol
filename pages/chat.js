import { Box, TextField, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
// lib(biblioteca) serviço do supabase: Nosso back-end vai ser o supabase. Obs: a lib do supabase é feita com Typescript, ela facilita o trabalho da API supabase
import { createClient } from '@supabase/supabase-js';

import { getUsuario } from "../src/services/apiGit";

// Componentes
import { ButtonSendSticker } from '../src/componentes/chat/ButtonSendSticker';
import { Loading } from '../src/componentes/chat/Loading';
import { Header } from '../src/componentes/chat/Header';
import { MessageList } from '../src/componentes/chat/MessageList';
import { ModalDeleteMensageRecusado } from '../src/componentes/chat/ModalDeleteMensageRecusado'

import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../src/services/bancoDeDados";
// supabase(serviço back-end) cliente, através dele que é possível pegar dados
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    // Pegando o metodo que joga o username da query usando o router do next pro username do config.json
    getUsuario()

    const [mensagem, setMensagem] = React.useState('');

    //o useState padrão é um array vazio, porque não tem mensagem nem uma ainda
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    const user = appConfig.username

    const [loading, setLoading] = React.useState(false);

    const [modalDeleteMensageRecusadoState , setModalDeleteMensageRecusado] = React.useState(false);

    // Esse metodo serve pra a gente ver as mensagens em tempo real, ele so é acionado quando da o insert(INSERT) no banco e ai ele faz algo. Então toda vez que essa função recebe um valor que é quando alguem deu um insert no banco de dados no caso esse insert é a mensagem composta(objeto: de e texto, já o id é feito no servidor) que foi feita pelo metodo handleNovaMensagem(pelo enter ou botão enviar), e quando essa mensagem composta é recebida pelo servidor atraves do insert, ele retorna pro metodo escuta mensagens(que so funciona(on) quando alguem da INSERT) acionando o useEffect e la ele seta essa nova mensagem com as mensagens antigas no array em memoria(listaDemensagens) fazendo aparecer em tempo real. Então o useEffect so vai rodar agora caso a pessoa atualize novamente a pagina setando todas as mensagens do banco de dados pro array em memoria(listaDeMensagen) para aparecer aqui na tela e no momento que alguem envia uma mensagem pro banco de dados(insert), aciona a função escuta mensagens que é chamada no useEffect assim setando uma nova mensagem no array(listaDeMensagens) em memoria para aparecer na tela em tempo real
    function escutaMensagensEmTempoReal(atualizarMensagem) {
        return supabaseClient
            .from('mensagens')
            .on('INSERT', (respostaLive) => {
                atualizarMensagem(respostaLive.new);
            })
            .subscribe();
    }

    // useEffect é para lidar com as coisas que fogem do fluxo padrão do componente. fluxo padrão  -> execução. Ter todos os valores na mão que bota no meio do return ele aparece, agora se o dado precisa vim de um servidor externo(precisa demorar um pouco pra acontecer) ele não faz parte do fluxo padrão, ele é um efeito colateral(uma coisa extra)
    //Isolado no useEffect: O efeito de bater no servidor, etc ta dentro do useEffect, então não vai ser toda vez que vai renderizar o chat pagesetListaDeMensagens(data), porque agora esta dentro de algo que so renderiza em certos momentos, esses momentos são: na hora que a pagina carrega(padrão) e quando a lista de mensagens atualizar, então essa função so vai bater/requisitar o servidor quando carregar a pagina e quando a lista de mensagens atualizar. Obs: o listaDeMensagens dentro do array é para isso mesmo, pra falar que é so pra bater no servidor quando a lista de mensagem atualizar(mudar) porque o useEffect vai observar as mudanças do listaDeMensagens, com isso não vai rodar varias vezes, somente quando mudar.
    // OBS: Antes tinha o listaDeMensagens no array do useEffect, mas como agora a gente usa um metodo pra escutar mensagens em tempo real pra atualizar a tela então não é preciso que o useEffect funcione quando a listaDeMensagens mudar, e sim quando enviamos a mensagem pro servidor que do servidor a gente seta pra lista de mensagens atraves do escutaMensagensEmTempoReal 
    React.useEffect(() => {
        // Usando a biblioteca do supabase, em vez de fazer na unha com o fetch, pra capturar as mensagens no servidor
        // Com o ponto from a gente passa o nome da tabela que foi criada no supabase, o select é o que a gente quer pegar, no caso tudo 
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                // setListaDeMensagens(dados.data);
                setListaDeMensagens(data);
                setLoading(true);
            });

        // Chmando o metodo escuta mensagem pra ver as mensagens em tempo real sem precisar de atualizar a pagina
        escutaMensagensEmTempoReal((novaMensagem) => {
            // Quero reusar um valor de referencia (objeto/array) 
            // Passar uma função pro setState

            // setListaDeMensagens([
            //     novaMensagem,
            //     ...listaDeMensagens
            // ])
            setListaDeMensagens((valorAtualDaLista) => {
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });
    }, []);

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
                    // AQUI NÃO FAZ MAIS O SET NA LISTA DE MENSGANES, SO DA INSERT NO BANCO DE DADOS, ELE ESTA DANDO SET NA LISTA DE MENSAGENS PELO ESCUTA MENSAGENS para aparecer elas em tempo real
                    // setListaDeMensagens([
                    //     // mensagemComposta,
                    //     // A gente não da set na lista com o objeto mensagem composta direto do codigo, a mensagem agora é data(dado) da posição 0 que tem todas as informações
                    //     data[0],
                    //     //pega o data com o restante das mensagens... -> PEGA TODOS OS ITENS QUE JA TEM DENTRO DA LISTA E ESPALHA DENTRO DA LISTA NOVA E O DA MENSAGEM
                    //     // no caso o ... quer dizer um conjunto de coisas, no caso um objeto de mensagens e transforma em um array do tipo passado
                    //     //Esse 3 pontos indicam que podem ser inúmeros parâmetros passados que serão convertidos em um único array de objetos
                    //     //https://www.luiztools.com.br/post/4-segredos-do-operador-spread-em-javascript/
                    //     ...listaDeMensagens,
                    // ]);

                });
            setMensagem('');
        }
    }
    // Aqui ele apaga a mensagem usando filter no MessageList, a exclusão funciona atraves do id da mensagem que tem na tabela do suprabase que foi enviada pelo usuario
    function handleDeleteMessage(id, mensagemDe) {
        if (user.toLowerCase() === mensagemDe.toLowerCase()) {
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

                })

        } else {
            setModalDeleteMensageRecusado(true)
        }
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.secondary[500],
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
                <Header nomeDe={user} />
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
                    {loading === true ? <MessageList mensagens={listaDeMensagens} deleteMessage={handleDeleteMessage} />
                        : <Loading />}

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
                                if (event.key === 'Enter' && event.shiftKey === false) {
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
                        {/* isso é Callback, igual do fetch, .then, o callback é sempre uma chamada de retorno, ou seja quando alguma coisa que voce queria terminou ele executa a função que voce passou*/}
                        {/* onStickerClick -> não é padrão do js, e sim de quem criou o componente, diferente de eventos padrões do js(ex:onClick) e muitos componentes react vão ter isso. Isso é chamado de interceptação que é voce poder desprover pra alguem que ta usando o seu componente a pessoa não precisar saber do codigo do componente em si pra voce poder usar algo desse componente e que essa coisa vai estar configurando dentro do componente como uma prop que esse componente vai receber e no onClick que vai estar no componente em si ele executa o comando, nesse caso é passando o sticker que a gente esta trbalhando*/}
                        {/* execução: primeiro ele roda o codigo que chama a função que esta dentro do componente e mostra o sticker e depois quem usa o componente no caso a pagina principal que salva esse sticker no banco, então quem ta usando ele recebe o sticker de dentro do componente, ou seja a gente passa o onStickerClick o componente recebe no props, registra no onClick pra que toda vez que alguem clickar em um sticker ele executa a função que se tiver a propriedade do stickerClick  ele chama essa função que foi passada passando um sticker na função dentro do componente*/}
                        {/* Obs: o sticker é renderizado no mensageList com o if de operador ternario e o sticker é enviando como texto pro serivdor:
                        :sticker: URL_Do_Sticker */}
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                // console.log('[usando o componente] salva esse sticker no banco', sticker)
                                handleNovaMensagem(':sticker: ' + sticker)
                            }}
                        />
                        {modalDeleteMensageRecusadoState && (
                        <ModalDeleteMensageRecusado estadoDeleteMensageModal={setModalDeleteMensageRecusado}/>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
