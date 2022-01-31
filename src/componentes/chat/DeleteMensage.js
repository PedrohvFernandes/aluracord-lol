import React from 'react';
import { Box, Text, Button } from '@skynexui/components';
import appConfig from '../../../config.json';

export function DeleteMensage(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <Text
                onClick={() => setIsOpen(true)}
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

            >
                X
            </Text>
            {/* Quando clicar ele fica  true, dessa forma o modal abre */}
            {isOpen && (
                <Box
                    className='modalDeleteMensage'
                    styleSheet={{
                        textAlign:'center',
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
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        
                        padding: '16px',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        width: 'auto',
                        height: '200px',
                        borderRadius: '10px'

                    }}>
                        <Text
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals["000"],
                                fontWeight: 'normal',
                               
                            }}>
                            Você quer realmente deletar essa mensagem ?
                        </Text>
                        <Box
                        styleSheet={{
                            display:'flex',
                            marginTop:'10px'
                        }}
                        >
                            <Button
                                label='Sim'
                                onClick={() => {
                                    props.deleteMensagens()
                                    setIsOpen(false)
                                }}
                                fullWidth
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.primary[1000],
                                    mainColor: appConfig.theme.colors.primary["000"],
                                    mainColorLight: appConfig.theme.colors.neutrals[800],
                                    mainColorStrong: appConfig.theme.colors.neutrals[800],
                                }}
                                styleSheet={{
                                    color: appConfig.theme.colors.primary[1000],
                                    marginRight:'5px',
                                    hover: {
                                        boxShadow: ' 0 0 0.5em rgb( 223, 184, 122)',
                                    }
                                }}
                            />
                            <Button
                                label='Não'
                                onClick={() => setIsOpen(false)}
                                fullWidth
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.primary[1000],
                                    mainColor: appConfig.theme.colors.primary["000"],
                                    mainColorLight: appConfig.theme.colors.neutrals[800],
                                    mainColorStrong: appConfig.theme.colors.neutrals[800],
                                }}
                                styleSheet={{
                                    color: appConfig.theme.colors.primary[1000],
                                    hover: {
                                        boxShadow: ' 0 0 0.5em rgb( 223, 184, 122)',
                                    }
                                }}
                            />

                        </Box>
                    </Box>
                </Box >

            )
            }
        </>
    )
}