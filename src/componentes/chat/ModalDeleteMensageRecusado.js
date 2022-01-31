import appConfig from '../../../config.json';
import { Box, Text, Button } from '@skynexui/components';

export function ModalDeleteMensageRecusado(props) {
    const estadoModalDeleteMensage = props.estadoDeleteMensageModal
    return (
        <>
            <Box
                className='modalDeleteMensageRecusado'
                styleSheet={{
                    textAlign: 'center',
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
                    marginRight: '-200px'
                }}

            >
                <Box styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',

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
                        APAGUE AS SUAS PROPIAS MENSAGENS 😡
                    </Text>
                    <Box
                        styleSheet={{
                            display: 'flex',
                            marginTop: '10px'
                        }}
                    >
                        <Button
                            label='Ok'
                            onClick={() => {
                                estadoModalDeleteMensage(false)
                               
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
                                marginRight: '5px',
                                hover: {
                                    boxShadow: ' 0 0 0.5em rgb( 223, 184, 122)',
                                }
                            }}
                        />
                    </Box>
                </Box>
            </Box >

        </>
    )

}