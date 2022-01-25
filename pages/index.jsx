import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import appConfig from '../config.json'

function Title({ tag, children }) {
  const Tag = tag || 'h2'

  return (
    <>
      <Tag>{children}</Tag>

      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}

export default function HomePage() {
  const router = useRouter();
  const [ userName, setUserName ] = useState('');
  const userURL = `https://api.github.com/users/${userName}`
  const [ userBio, setUserBio ] = useState('');
  const [ userCompany, setUserCompany ] = useState('');
  
  function handleChange(event) {
    setUserName(event.target.value)

    if (event.target.value.length > 2) {
      fetch(userURL)
        .then(response => response.json())
        .then(data => {
          setUserBio(data.bio)
          setUserCompany(data.company)
        })
    }
  }

  const imageError = 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80';

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
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
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={event => {
              event.preventDefault()
              router.push('/chat')
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              fullWidth
              value={userName}
              onChange={handleChange}
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
              src={
                userName.length > 2
                  ? `https://github.com/${userName}.png`
                  : imageError
              }
            />

            {
              userName.length > 2 && (
                <>
                  <Text
                    variant="body4"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals[200],
                      backgroundColor: appConfig.theme.colors.neutrals[900],
                      padding: '3px 10px',
                      borderRadius: '1000px'
                    }}
                  >
                    {userName}
                  </Text>

                  <Text
                    variant="body4"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals[200],
                      backgroundColor: appConfig.theme.colors.neutrals[900],
                      padding: '3px 10px',
                      borderRadius: '1000px'
                    }}
                  >
                    {userBio}
                  </Text>
                </>
              )
            }
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}