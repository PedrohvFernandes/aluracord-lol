// Iremos usar os componentes da lib storybook.skynexui
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
//Importando a configuração de paleta de cores e stickers que a Alura fez e armazenando nessa variavel, com isso so precisa mudar a cor na config, com isso o css fica dinamico https://coolors.co/ffffff-fff8e8-fcd581-d52941-990d35
import appConfig from '../config.json';

// Hooks são ganchos: gancho pra algo, ganhco pra roteamento, etc e sempre com o 'use' 'alguma coisa', sempre tem um gancho no react pra alguma coisa
// Importando hooks do react:

// Importando o react pra usar os hooks
import React from 'react';
// import { useState } from 'react';

// Importando os roteadores do next, obs: o proprio next faz o roteamento em vez de fazer na unha com o React, o next faz com o React para nos
import { useRouter } from 'next/router';



// Componente titulo
// O props pega todas as propriedades do componente, por exemplo o filho dele(o titulo) e a tag
function Titulo(props) {
  // Pegando a tag definida no componente e colocando na variavel Tag pra sempre controlar o css de forma dinamica
  // o h1 vai ser pego caso ninguem passe valor no atributo tag do componente
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
      ${Tag} {
        color: ${appConfig.theme.colors.neutrals['000']};
        font-size: 24px;
        font-weight:600px;
      }
    `}</style>
    </>
  );
}

//Componente react
// function HomePage() {
//   //JSX
//   return (
//     <div>
//       <GlobalStyle />
//       <Titulo tag="h1">Boas vinda de volta!</Titulo>
//       <h2> Discord - Alura Matrix </h2>
//     </div>
//   )
// }
// export default HomePage

export default function PaginaInicial() {
  // Hook de estado
  //o username é o valor inicial/definido e setUsername ira fazer com que eu consiga inserir um novo digito no campo imput, porque no react é como que cada digito é uma foto é uma atualização, com isso agora eu consigo mudar o valor e a onde tiver a variavel username vai mudar dinamicamente e melhor so muda a onde deve mudar ele não recarrega a pagina toda: gerando perfomace, uma alteração de uma vez so em varios locais
  const [username, setUsername] = React.useState('PedrohvFernandes');

  // Hook de roteamento: serve para que a pagina não recarregue so mude o que precisa do que esta na outra pagina, e ir empilhando as paginas na barra de navegação do navegador
  const roteamento = useRouter();

  // const [button, setButton] = React.useState("disabled");

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_LeagueofLegends_RiotGames_S1_2560x1440-ee500721c06da3ec1e5535a88588c77f)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            height: '100%', maxHeight: '500px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],

          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function(infosDoEvento){
              infosDoEvento.preventDefault();
              roteamento.push('/chat')
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h1">BEM VINDOS A SUMMONERS RIFT!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={function (event) {
                console.log('usuario digitou', event.target.value)
                // Onde ta o valor
                const valor = event.target.value;
                // trocar o valor da variavel
                setUsername(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px',
                fontSize: '15px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}