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
          font-family: 'Open Sans', sans-serif;
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
      `}</style>
    );
}

// Esse next custom app não vira uma pagina, mas a vantagem dele é que ele roda em todas as paginas, então aqui fica as funções globais
// O importante é o nome do arquivo _app.js pro next achar
export default function MyApp({ Component, pageProps }) {
    console.log('roda em todas as paginas')
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}