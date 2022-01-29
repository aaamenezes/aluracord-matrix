import React, { useState } from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';
import { useRouter } from 'next/router';

export default function StickerButton({ cavesData, onStickerClick }) {
  const [ isOpen, setOpenState ] = useState('');

  const router = useRouter();
  const { id } = router.query;

  const character = cavesData.find(character => character.id === id);

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
          minWidth: '50px',
          minHeight: '50px',
          fontSize: '20px',
          margin: '0 12px 8px 0',
          lineHeight: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals[300],
          filter: isOpen ? 'grayscale(0)' : 'grayscale(1)',
          hover: {
            filter: 'grayscale(0)',
          }
        }}
        label="😋"
        onClick={() => setOpenState(!isOpen)}
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
            right: '30px',
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
              overflow: 'scroll',
            }}
          >
            {character.stickerImages.map(sticker => {
              const stickerImageURL = `https://diegochagas.com/saint-seiya-api/${sticker}`

              return (
                <Text
                  key={sticker.id}
                  onClick={() => onStickerClick(stickerImageURL)}
                  tag="li" key={sticker}
                  styleSheet={{
                    width: '50%',
                    borderRadius: '5px',
                    padding: '10px',
                    cursor: 'pointer',
                    focus: {
                      backgroundColor: appConfig.theme.colors.neutrals[600],
                    },
                    hover: {
                      backgroundColor: appConfig.theme.colors.neutrals[600],
                    }
                  }}
                >
                  <Image src={stickerImageURL} />
                </Text>
              )
            })}
          </Box>
        </Box>
      )}
    </Box>
  )
}