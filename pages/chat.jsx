import { Box, Button, TextField } from '@skynexui/components';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import appConfig from '../config.json';
import Header from '../src/components/Header';
import MessageList from '../src/components/MessageList';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4MjAwNywiZXhwIjoxOTU4ODU4MDA3fQ.vmigzEb795WGRSsMVA_1WSbcUn13DUvNnhSh3A1EFc0'
const SUPABASE_URL = 'https://qdqsshfhexljqmrzhhba.supabase.co'
const supabaseClient = createClient( SUPABASE_URL, SUPABASE_ANON_KEY )

// tela de loading antes do bando mandar as mensagems
// hover com perfil do usuário
// botao enviar sticker anexo etc

export default function ChatPage() {
  const [ message, setMessage ] = useState('');
  const [ messagesList, setMessagesList ] = useState([]);

  useEffect(() => {
    supabaseClient
      .from('messagesList')
      .select('*')
      .order('id', { ascending: false })
      .then( ({ data }) => setMessagesList(data))
  }, [] )

  function handleChange(event) {
    setMessage(event.target.value)
  }

  function handleKeyPress(event, message) {
    if (event.key === 'Enter') {
      event.preventDefault()
      sendMessage(message)
      setMessage('')
    }
  }
  
  function sendMessage(newMensagem) {
    const message = {
      // id: messagesList.length + 1, // Usando ID do Supabase
      from: 'aaamenezes',
      text: newMensagem
    }

    supabaseClient
      .from('messagesList')
      .insert([ message ])
      .then( ({ data }) => {
        setMessagesList([ data[0], ...messagesList ])
      })
  }

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          <MessageList messages={messagesList} setMessagesList={setMessagesList} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={message}
              onChange={handleChange}
              onKeyPress={event => handleKeyPress(event, message)}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              type='button'
              label='Send'
              styleSheet={{
                height: '100%',
              }}
              onClick={() => sendMessage(message)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}