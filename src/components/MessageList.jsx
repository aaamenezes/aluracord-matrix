import { Box, Button, Image, Text } from "@skynexui/components";
import appConfig from '../../config.json'

export default function MessageList({ messages, setMessagesList }) {
  function handleRemove(id) {
    const newMessages = messages.filter(message => message.id !== id);
    setMessagesList(newMessages)
  }

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >

      {
        messages.map(message => (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              position: 'relative',
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text tag="strong">
                {message.from}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
              </Text>
            </Box>
            {message.text}
            <Button
              type='button'
              label='&times;'
              size='sm'
              variant='tertiary'
              colorVariant='light'
              onClick={() => handleRemove(message.id)}
              styleSheet={{
                position: 'absolute',
                top: '4px',
                right: '4px'
              }}
            />
          </Text>
        ))
      }
    </Box>
  )
}