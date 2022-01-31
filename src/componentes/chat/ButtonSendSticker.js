import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../../config.json';

export function ButtonSendSticker(props) {
  const [isOpen, setOpenState] = React.useState('');

  const [carinha, setCarinha] = React.useState();


  React.useEffect(() => {
    const carinhas = {
      1: '🙂',
      2: '😙',
      3: '🤩',
      4: '☹️',
      5: '😣',
      6: '🤯',
      7: '👍',
      8: '👩‍💻',
      9: '👨‍💻',
      10:'🧑‍🚀',
      11:'👨‍🚀',
      12:'🧑‍💻',
      13:'👀',
      14:'👏',
      15:'😎',
      16:'🥺',
      17:'🥶',
      18:'🧐',
      19:'😬',
      20:'😱',
      21:'👻',
      22:'💀',
      23:'🤡',
      24:'🎃',
      25:'👾'
    };
    const randomCarinhas = Math.floor(Math.random() * (25 - 1) + 1);

    const trocaCarinhas = carinhas[randomCarinhas];
    setCarinha(trocaCarinhas)

  }, []);


  return (
    <Box
      styleSheet={{
        position: 'relative',
      }}
    >
      <Button
        styleSheet={{
          borderRadius: '50%',
          padding: '0 3px 0 0',
          minWidth: '60px',
          minHeight: '60px',
          marginBottom: '8px',
          lineHeight: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals['000'],
          filter: isOpen ? 'grayscale(0)' : 'grayscale(1)',
          margin: '5px',
          hover: {
            filter: 'grayscale(0)',
            boxShadow: ' 0 0 2em rgb( 223, 184, 122)',
          }
        }}
        buttonColors={{
          contrastColor: appConfig.theme.colors.primary[1000],
          mainColor: appConfig.theme.colors.primary["000"],
          mainColorLight: appConfig.theme.colors.neutrals[800],
          mainColorStrong: appConfig.theme.colors.neutrals[800],
        }}
        label={carinha}
        onClick={() => {     
          const carinhas = {
            1: '🙂',
            2: '😙',
            3: '🤩',
            4: '☹️',
            5: '😣',
            6: '🤯',
            7: '👍',
            8: '👩‍💻',
            9: '👨‍💻',
            10:'🧑‍🚀',
            11:'👨‍🚀',
            12:'🧑‍💻',
            13:'👀',
            14:'👏',
            15:'😎',
            16:'🥺',
            17:'🥶',
            18:'🧐',
            19:'😬',
            20:'😱',
            21:'👻',
            22:'💀',
            23:'🤡',
            24:'🎃',
            25:'👾'
          };
          const randomCarinhas = Math.floor(Math.random() * (25 - 1) + 1);  
          const trocaCarinhas = carinhas[randomCarinhas];
          setCarinha(trocaCarinhas)
          setOpenState(!isOpen)
        }
        }

      />
      {isOpen && (
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            position: 'absolute',
            backgroundColor: appConfig.theme.colors.neutrals[800],
            width: {
              xs: '200px',
              sm: '290px',
            },
            height: '300px',
            right: '50px',
            bottom: '30px',
            padding: '16px',
            boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
          }}
          onClick={() => setOpenState(false)}
        >
          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: 'bold',
            }}
          >
            Stickers
          </Text>
          <Box
            tag="ul"
            styleSheet={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              flex: 1,
              paddingTop: '16px',
              overflowY: 'auto',
              cursor: 'pointer'
            }}
          >
            {appConfig.stickers.map((sticker) => (
              <Text
                onClick={() => {
                  // console.log('[DENTRO DO COMPONENTE] Clicou no sticker:', sticker);
                  if (Boolean(props.onStickerClick)) {
                    props.onStickerClick(sticker);
                  }
                }}
                tag="li" key={sticker}
                styleSheet={{
                  width: '50%',
                  borderRadius: '5px',
                  padding: '10px',
                  focus: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  },
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                    boxShadow: '0 0 2em rgb( 223, 184, 122)'
                  }
                }}
              >
                <Image src={sticker} />
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}