// Iremos usar os componentes da lib storybook.skynexui
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
//Importando a configuração de paleta de cores e stickers que a Alura fez e armazenando nessa variavel, com isso so precisa mudar a cor na config, com isso o css fica dinamico https://coolors.co/ffffff-fff8e8-fcd581-d52941-990d35
import appConfig from '../config.json';

// Hooks são ganchos: gancho pra algo, ganhco pra roteamento, etc e sempre com o 'use' 'alguma coisa', sempre tem um gancho no react pra alguma coisa
// Importando hooks do react:

// Importando o react pra usar os hooks
import React from 'react'
// import React, { useState } from 'react';

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
  const [username, setUsername] = React.useState('');

  // Hook de roteamento: serve para que a pagina não recarregue so mude o que precisa do que esta na outra pagina, e ir empilhando as paginas na barra de navegação do navegador
  const roteamento = useRouter();

  const imagemError = 'https://stickers.wiki/static/stickers/league3motes/file_251551.webp?ezimgfmt=rs:144x144/rscb1/ng:webp/ngcb1';

  const [dados, setDados] = React.useState([]);

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
            boxShadow: ' 0 0 5em rgb( 223, 184, 122)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            //forms, o onSubmit faz o rotemento usando o hook do next e ja seta o usuario 
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              appConfig.username = username
              roteamento.push('/chat')
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Image
              src='https://preview.redd.it/iiyq7332zd811.png?auto=webp&s=13c8d0c08dd97f1a256cba0d0347bfd07950b3bf'
              styleSheet={{
                maxWidth: '150px',
                maxHeight: '150px'
              }}
            />
            <Titulo tag="h1">BEM VINDOS A SUMMONERS RIFT!</Titulo>
            <Text variant="body3" styleSheet={{ fontFamily: 'friz quadrata bold', marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name} ({username})
            </Text>

            <TextField
              placeholder='Digite o nome do usuario...'
              value={username}
              onChange={function (event) {
                // Onde ta o valor
                const valor = event.target.value;
                // trocar o valor da variavel
                setUsername(valor);
                fetch(`https://api.github.com/users/${valor}`)
                  .then(response => response.json())
                  .then(data => {
                    setDados(data)
                  })
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
            {username.length > 2 && username.length !== null && username.trim() && (
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
            )}
          </Box>

          {/* Formulário */}


          {/* Photo Area */}

          < Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              boxShadow: ' 0 0 1em rgb( 223, 184, 122)',
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
              src={username.length > 2 && username.length !== null && username.trim() ? `https://github.com/${username}.png` : imagemError}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[500],
                padding: '10px',
                borderRadius: '5px',
                fontSize: '15px',
                marginBottom: '10px'
              }}
            >
              {username.length > 2 && username.length !== null && username.trim() ? username : "O campo está vazio!"}
            </Text>
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[300]
              }}
            >
              {dados.name}
            </Text>
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[300]
              }}
            >
              {dados.location}
            </Text>
            <Text
              variant="body4"
              styleSheet={{
                margin: '5px', borderBottom: 'solid 1px grey', color: appConfig.theme.colors.neutrals[300]
              }}
            >
              Followers: {dados.followers}
            </Text>
            <a
              target="_blank"
              variant="body4"
              style={{
                border: 'solid 1px grey', padding: '0px 5px', borderRadius: '10px', textDecoration: 'none', color: appConfig.theme.colors.neutrals[300], fontSize: '15px', cursor: 'pointer'
              }}
              href={dados.html_url}>
              IR PARA O GIT
            </a>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}