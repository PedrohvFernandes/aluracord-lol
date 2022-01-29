import React from 'react';
import { Box, Text, Image } from '@skynexui/components';
import appConfig from '../../../config.json';
import { gitURL, apiGithub } from "../../services/apiGit";

// Componente de mensagem nosso que é o componente que faz as mensagens aparecerem na tela
export function MessageList(props) {
    // Essa variavel armazena a função de deletar a mensagem atraves do props, que no componente do MessageList é passado-> props.deleteMessage
    const handleDeleteMessage = props.deleteMessage

    // Passa o tempo que foi enviando a mensagem created_al, esse created_al pega a data do dia de criação de mensagem, por exemplo: 2022-01-29T13:24:05.54942+00:00
    function gerenciadorDeData(string) {
        // tempo
        var time = new Date(string).toLocaleTimeString().substring(0, 5)
        // dia
        var date = new Date().toLocaleDateString()
        // se foi no passado, ontem, etc
        var data
        // a data de hoje - a data da mensagem que é pega pelo created_al
        switch (new Date().getDay() - new Date(string).getDay()) {
            // Caso se a mensagem foi enviado hoje então: a data de hoje - a data de envio da mensagem = 0
            case 0:
                data = 'Hoje'
                break
            case 1:
                data = 'ontem'
                break
            case 2:
                data = 'anteontem'
                break
            // Caso ja tenha passado mais de 2 dias ele fala que ja tem mais de dois dias e a data
            default:
                time = 'Mais de 2 dias'
                data = new Date(string).toLocaleDateString()
        }
        return `${data} ${date} ${time}`
    }
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
                            wordBreak:'break-all',
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
                            <a
                                target="_blank"
                                variant="body4"
                                style={{
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    height: '45px',
                                }}
                                href={`${gitURL}${mensagem.de}`}>
                                <Image
                                    styleSheet={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                        transition: 'all 0.2s ease-in-out',
                                        hover: {
                                            width: '45px',
                                            height: '45px',
                                            transition: 'all 0.2s ease-in-out',
                                        }
                                    }}
                                    src={`${gitURL}${mensagem.de}.png`}

                                />
                            </a>
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
                                {/* O campo Created_at indica a hora da criação do documento e o campo updated_at indica a hora da atualização, se houver, a hora da criação do documento. */}
                                {gerenciadorDeData(mensagem.created_at)}
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
                                    transition: 'all 0.2s ease-in-out',
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.neutrals[800],
                                        boxShadow: ' 0 0 2em rgb( 223, 184, 122)',
                                        transition: 'all 0.2s ease-in-out',
                                    }
                                }}
                                tag="span"
                                data-id={mensagem.id}
                            >
                                X
                            </Text>
                        </Box>
                        {/* Modo Declarativo, ou seja a gente declara o que a gente quer que retorne, ja no outro if a gente da ordem pra retorna que é o if padrão se acontecer isso injeta isso nesse pedaço aqui, ja essse é o if operador ternario a onde a gente so descreve(declarativo) se for assim na hora que tiver renderizando*/}
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image
                                    styleSheet={{
                                        width: '200px',
                                    }}
                                    src={mensagem.texto.replace(':sticker:', '')} />
                            )
                            : (
                                <Text
                                    styleSheet={{
                                        hover: {
                                            borderBottom: '1px solid rgb( 223, 184, 122)',
                                        }
                                    }}>
                                    {mensagem.texto}
                                </Text>
                            )}

                    </Text>
                );
            })}
        </Box>
    )
}