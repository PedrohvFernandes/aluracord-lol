// Importando o head igual do html a onde fica os metadados(font, favico, styles(css)), a gente importa aqui porque o _app.js é reconhecido pelo next como config global https://ichi.pro/pt/uma-estrutura-de-diretorios-e-arquivos-next-js-basica-opinativa-150628700170073
import Head from "next/head";
//Componente que vai resetar todo o estilo da pagina, por isso o nome global
function GlobalStyle() {
  return (
    <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'friz quadrata bold';
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
        
        ::-webkit-scrollbar {
          width: 5px;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 5px;
          background-color: #52667A;
        }
        ::-webkit-scrollbar-track {
          border-radius: 5px;
          background-color: #080A0C;
        }
        
      @keyframes rotate {
          to {
              transform: rotate(1turn);
          }
      }

      `}</style>
  );
}

// Esse next custom app não vira uma pagina, mas a vantagem dele é que ele roda em todas as paginas, então aqui fica as funções globais
// O importante é o nome do arquivo _app.js pro next achar
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Lolcord</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
        <meta property="og:title" content="Concord" key="title" />
        <meta property="og:description" content="Venha jogar um lolzin." />
        <meta property="og:url" content="aluracord-lol.vercel.app" />
        <link rel="shortcut icon" href="favicon-32x32.png" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}