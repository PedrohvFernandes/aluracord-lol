import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../../config.json';
import { gitURL } from '../../services/apiGit';

// Componente header feito por nos e não pela @skynexui/components
export function Header(props) {
    const [nome, setNome] = React.useState('');

    const nomeUser = props.nomeDe;


    if (nome.length < nomeUser.length) {
        let count = nome.length
        setTimeout(() => {
            setNome(nome + nomeUser[count]);
        }, 65);

    }

    return (
        <>
            <Box styleSheet={{
                width: '100%',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
            >
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
                        marginLeft: '5px',
                        border: '1px solid rgb( 223, 184, 122)',
                        transition: 'all 0.2s ease-in',
                        hover: {
                            transition: 'all 0.2s ease-in',
                            width: '50px',
                            height: '50px',
                        }
                    }}
                    src={`${gitURL}${nomeUser}.png`}
                />

                <Text
                    className='nomeUsuario'
                    styleSheet={{
                        fontSize: '20px',
                        borderBottom: '1px solid rgb( 223, 184, 122)'
                    }}
                >
                    {nome}
                </Text>
                <Button
                    variant='tertiary'
                    label='Sair'
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