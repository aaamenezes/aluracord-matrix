import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import appConfig from '../config.json';
import Select from '../src/components/Select';
import Title from '../src/components/Title';

export default function HomePage({ cavesData }) {
  const router = useRouter();
  const [ character, setCharacter ] = useState('');
  const [ backgroundImage, setBackgroundImage ] = useState('/images/caves.gif');

  function handleChange(event) {
    const { value } = event.target
    setCharacter(value)

    const currentChatacter = cavesData.find(
      character => character.name.toLowerCase() === value.toLowerCase(
    ))

    if (currentChatacter) {
      const currentChatacterImage = currentChatacter.image
      
      const imageURL = `https://diegochagas.com/saint-seiya-api/${currentChatacterImage}`
  
      setBackgroundImage(imageURL)
    }
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[100],
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
          minWidth: '400px',
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
            router.push(`/chat?character=${character}&backgroundImage=${backgroundImage}`)
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
  const rawData = await response.json()
  const cavesData = await rawData.filter(character => character.name)

  return {
    props: { cavesData }
  }
}