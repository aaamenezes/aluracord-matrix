import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import appConfig from '../config.json';
import Select from '../src/components/Select';
import Title from '../src/components/Title';

export default function HomePage({ cavesData }) {
  const router = useRouter();
  const [ character, setCharacter ] = useState('');
  const [ characterID, setCharacterID ] = useState('');
  const [ backgroundImage, setBackgroundImage ] = useState('/images/caves.gif');
  const [ backgroundColor, setBackgroundColor ] = useState(appConfig.theme.colors.primary[100]);

  function handleChange(event) {
    const { value } = event.target
    setCharacter(value)

    const currentChatacter = cavesData.find(
      character => character.name.toLowerCase() === value.toLowerCase(
    ))

    if (currentChatacter) {
      setCharacterID(currentChatacter.id)
      const currentChatacterImage = currentChatacter.image
      
      const imageURL = `https://diegochagas.com/saint-seiya-api/${currentChatacterImage}`
  
      setBackgroundImage(imageURL)
    }
  }

  function handleColor(event) {
    
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          width: '95%',
          maxWidth: '525px',
          borderRadius: '5px',
          padding: {
            xs: '32px',
            sm: '64px'
          },
          margin: '16px',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          backgroundColor: appConfig.theme.colors.neutrals[700],
        }}
      >
        {/* Formulário */}
        <Box
          as="form"
          onSubmit={event => {
            event.preventDefault()
            router.push(`/chat?character=${character}&id=${characterID}&backgroundImage=${backgroundImage}`)
          }}
          styleSheet={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <Title tag="h2">{appConfig.title}</Title>
          <Text
            variant="body3"
            styleSheet={{
              margin: '16px 0',
              color: appConfig.theme.colors.neutrals[300]
            }}
          >
            {appConfig.subtitle}
          </Text>

          <Select
            cavesData={cavesData}
            character={character}
            handleChange={handleChange}
          />

          <Box
          styleSheet={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',

            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(26px, 1fr))',
            gridGap: '12px',
            width: '100%',
            margin: '1rem 0'
          }}
          >
            {
              appConfig.interfaceColors.map(color => (
                <Button
                  key={color.id}
                  onClick={event => setBackgroundColor(event.target.value)}
                  value={color}
                  styleSheet={{
                    width: '1rem',
                    height: '1rem',
                    backgroundColor: color,
                    hover: {
                      transform: 'scale(1.3)',
                      backgroundColor: color
                    },
                    active: { backgroundColor: color },
                    focus: { backgroundColor: color }
                  }}
                />
              ))
            }
          </Box>

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
      </Box>
    </Box>
  );
}

export async function getStaticProps() {
  const response = await fetch('https://saint-seiya-api.herokuapp.com/api/characters')
  const allData = await response.json()
  const cavesData = await allData
    .filter(character => character.name)
    .map(character => {
      const { id, name, image } = character
      const stickerImages = character.cloths.map(cloth => cloth.image)

      return { id, name, image, stickerImages }
    })

  return {
    props: { cavesData }
  }
}