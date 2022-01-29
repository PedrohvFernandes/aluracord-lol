import appConfig from '../../../config.json';

// Componente titulo
// O props pega todas as propriedades do componente, por exemplo o filho dele(o titulo) e a tag
export function Titulo(props) {
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