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

import { Titulo } from '../src/componentes/inicial/Titulo';

import { gitURL, apiGithub } from "../src/services/apiGit";

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

  const [dados, setDados] = React.useState([]);

  const [image, setImage] = React.useState();

  const [imagemError, setImagemError] = React.useState();

  const [nomeImagem, setNomeImagem] = React.useState();

  const [usuarioImagem, setUsuarioImagem] = React.useState();

  const [usuarioValidoBottao, setUsuarioValidoBottao] = React.useState(false);

  const [titulo, setTitulo] = React.useState('');

  const texto = 'BEM VINDOS A SUMMONERS RIFT!';


  if (titulo.length < texto.length) {
    let count = titulo.length
    setTimeout(() => {
      setTitulo(titulo + texto[count]);
    }, 70);

  }

  React.useEffect(() => {
    const lolPersonsagens = {
      1: 'https://1.bp.blogspot.com/-UxYmEysL7U8/Wz_JMHJjQ3I/AAAAAAABC1I/bt32bNh847kQK2Op-fx6HLuGkCcGlD6qgCLcBGAs/s1600/1b001b50f2f8b041.png',
      2: 'https://preview.redd.it/iiyq7332zd811.png?auto=webp&s=13c8d0c08dd97f1a256cba0d0347bfd07950b3bf',
      3: 'https://external-preview.redd.it/-2PLwAS8j6Eu2oXNHv_BVmyZTWVhvnNPcCYAr9JnzD0.png?auto=webp&s=d5879f4642beb446d96b17dcb3071e889b930e56',
      4: 'https://stickers.wiki/static/stickers/lolfacebook/file_39336.webp',
      5: 'https://i.pinimg.com/originals/c0/7b/21/c07b216479f0021631116a08b93d613b.png',
    };

    const lolPersonsagensError = {
      1: 'https://stickers.wiki/static/stickers/league3motes/file_251551.webp?ezimgfmt=rs:144x144/rscb1/ng:webp/ngcb1',
      2: 'https://stickers.wiki/static/stickers/gnarandfriends/file_780480.webp',
      3: 'https://stickers.wiki/static/stickers/league3motes/file_251550.webp?ezimgfmt=rs:134x134/rscb1/ng:webp/ngcb1',
      4: 'https://stickers.wiki/static/stickers/league3motes/file_251599.webp',
      5: 'https://www.mobafire.com/images/news/emotes/angry-kitten.png',
    };


    const randomImagens = Math.floor(Math.random() * (5 - 1 + 1) + 1);

    const lolPerso = lolPersonsagens[randomImagens];

    const lolPersoError = lolPersonsagensError[randomImagens]

    setImage(lolPerso)
    setImagemError(lolPersoError)
  }, []);


  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.secondary[500],
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
            height: 'auto', maxHeight: '850px',
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
              roteamento.push(`/chat?username=${username}`)
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Image
              src={image}
              styleSheet={{
                maxWidth: '150px',
                maxHeight: '150px'
              }}
            />
            <Titulo tag="h1">{titulo}</Titulo>
            <Text variant="body3" styleSheet={{ fontFamily: 'friz quadrata bold', marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name} ({username})
            </Text>

            <TextField
              placeholder='Digite o nome do usuario...'
              value={username}
              onChange={function (event) {
                // Onde ta o valor
                const valor = event.target.value;
                // Trocar o valor da username que esta no campo
                setUsername(valor);
                // validar se existe o usuário e pegar a sua foto
                fetch(`${apiGithub}${valor}`).then(
                  (response) => {
                    // se existir vai pegar a foto e por o nome do username na tela
                    if (response.status === 200) {
                      response.json()
                        .then(
                          (data) => {
                            // seta os dados pra aparecer na telinha que aparece a imagem do usuario
                            setDados(data)
                            console.log(data)
                          }
                        );
                      // Aqui seta o nome do usuario caso ele existir
                      setNomeImagem(`${valor}`);
                      // aqui é a onde a gente armazena a imagem do usuario
                      setUsuarioImagem(`${gitURL}${valor}.png`);
                      // faz o botão aparecer se o usuario for valido
                      setUsuarioValidoBottao(true);
                    } else if (response.status === 404) {
                      // Caso ele não exista a gente muda pra uma imagem de erro e fala que ele não exite
                      setNomeImagem('O usuario não existe no banco de dados do GIT 😕');
                      setUsuarioImagem(imagemError);
                      // faz o botão desaparecer se o usuario for valido
                      setUsuarioValidoBottao(false);
                    } else if (response.status === 403) {
                      setNomeImagem('Limite excedido para uso da API do GitHub 😢');
                      setUsuarioImagem(imagemError);
                      setUsuarioValidoBottao(false);
                    } else if (username.length < 2 && username.length === null && !username.trim()) {
                      setUsuarioValidoBottao(false);
                    } else {
                      setNomeImagem('ALGO DEU DE ERRADO');
                      setUsuarioImagem(imagemError);
                      setUsuarioValidoBottao(false);
                    }
                  })
              }
              }
              // onChange={function (event) {
              //   // Onde ta o valor
              //   const valor = event.target.value;
              //   // trocar o valor da variavel
              //   setUsername(valor);
              //   fetch(`https://api.github.com/users/${valor}`)
              //     .then(response => response.json())
              //     .then(data => {
              //       setDados(data)
              //     })
              // }}
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
                contrastColor: appConfig.theme.colors.primary[1000],
                mainColor: appConfig.theme.colors.primary["000"],
                mainColorLight: appConfig.theme.colors.neutrals[800],
                mainColorStrong: appConfig.theme.colors.neutrals[800],
              }}
              styleSheet={{
                color: appConfig.theme.colors.primary[1000],
                hover: {
                  boxShadow: ' 0 0 2em rgb( 223, 184, 122)',
                }
              }}
              disabled={!usuarioValidoBottao}
            />
            {/* )} */}

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
              minHeight: 'auto',
            }}
          >

            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={username.length > 2 && username.length !== null && username.trim() ? usuarioImagem : imagemError}
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
              {username.length > 2 && username.length !== null && username.trim() ? nomeImagem : "Você precisa digitar mais do que dois caracteres!"}
            </Text>

            {/* So vai renderizar essas informações na tela se acontecer isso aqui, mesma coisa para os outros ifs ternarios */}
            {username.length > 2 && username.length !== null && username.trim() && usuarioValidoBottao === true &&
              <Box
                styleSheet={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >

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
                    padding:'0 5px',
                    textAlign: 'center',
                    borderRadius: '10px',
                    fontSize: '15px',
                    cursor: 'pointer',
                    hover: {
                      boxShadow: ' 0 0 1em rgb( 223, 184, 122)',
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
            }
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  )
}