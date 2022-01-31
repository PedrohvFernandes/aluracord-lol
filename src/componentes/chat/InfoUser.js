import React from 'react';
import { Box, Text, Image } from '@skynexui/components';
import appConfig from '../../../config.json';
import { apiGithub, gitURL } from '../../services/apiGit';

export function InfoUser(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [dados, setDados] = React.useState([]);
    const mensagemDe = props.mensagemDe;

    function getData(name) {
        fetch(`${apiGithub}${name}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setDados(data)
            });
    }

    return (
        <>
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
                        cursor: 'pointer'
                    }
                }}
                src={`${gitURL}${mensagemDe}.png`}
                onClick={() => {
                    setIsOpen(true);
                    getData(mensagemDe)
                }}
            />
            {/* Quando clicar ele fica  true, dessa forma o modal abre */}
            {isOpen && (
                <Box
                    className='modalUser'
                    styleSheet={{
                        borderRadius: '10px',
                        position: 'absolute',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        width: 'auto',
                        height: 'auto',
                        boxShadow: ' 0 0 1em rgb( 223, 184, 122)',
                        padding: '5px',
                        right: '50%',
                        bottom: '50%',
                        marginBottom: '-150px',
                        marginRight: '-155px'
                    }}

                >
                    <Box styleSheet={{
                        flexWrap: 'wrap',
                        padding: '16px',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        width: '300px',
                        height: 'auto',
                        borderRadius:'10px'

                    }}>
                        <Text
                            onClick={() => { setIsOpen(false) }}
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
                                    boxShadow: ' 0 0 0.5em rgb( 223, 184, 122)',
                                    transition: 'all 0.2s ease-in-out',
                                }
                            }}
                            tag="span"
                        >
                            X
                        </Text>
                        <Box
                            styleSheet={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                styleSheet={{
                                    borderRadius: '20%',
                                    maxWidth: '70%',
                                    border: '2px solid',
                                    borderColor: 'appConfig.theme.colors.neutrals[000]',
                                }}
                                src={`${gitURL}${mensagemDe}.png`} />
                            <Text
                                variant="body4"
                                styleSheet={{
                                    margin: '5px',
                                    color: appConfig.theme.colors.neutrals[300]
                                }}
                            >
                                Nome: {dados.name}
                            </Text>
                            <Text
                                variant="body4"
                                styleSheet={{
                                    margin: '5px',
                                    color: appConfig.theme.colors.neutrals[300]
                                }}
                            >
                                Local: {dados.location}
                            </Text>
                            <Text
                                variant="body4"
                                styleSheet={{
                                    margin: '5px',
                                    color: appConfig.theme.colors.neutrals[300]
                                }}
                            >
                                Seguidores: {dados.followers}
                            </Text>
                            <Text
                                variant="body4"
                                styleSheet={{
                                    border: 'solid 1px grey',
                                    padding: '0 5px',
                                    textAlign: 'center',
                                    borderRadius: '10px',
                                    fontSize: '15px',
                                    cursor: 'pointer',
                                    width: '50%',
                                    alignSelf: 'center',
                                    margin:'5px',
                                    hover: {
                                        boxShadow: ' 0 0 0.5em rgb( 223, 184, 122)',
                                    }
                                }}
                            >
                                <a
                                    target="_blank"
                                    style={{
                                        textDecoration: 'none',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    href={dados.html_url}>
                                    IR PARA O GIT
                                </a>
                            </Text>
                        </Box>
                    </Box>
                </Box >

            )
            }
        </>
    )
}