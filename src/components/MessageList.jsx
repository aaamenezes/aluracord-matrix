import { Box, Button, Image, Text } from "@skynexui/components";
import appConfig from '../../config.json'

export default function MessageList({ messages, handleRemove, character }) {
  return (
    <>
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
            <div className="message-item">
              <Text
                key={message.id}
                tag="li"
                styleSheet={{
                  position: 'relative',
                  borderRadius: '5px',
                  padding: '12px',
                  marginBottom: '18px',
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                  }
                }}
              >
                <Box
                  className="avatar-box"
                  styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <Image
                    className="avatar-image"
                    styleSheet={{
                      width: '30px',
                      height: '30px',
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

                <Box>
                  {
                    message.text.startsWith(':sticker:')
                      ? (
                        <Image
                          src={message.text.replace(':sticker:', '')}
                          styleSheet={{
                            maxWidth: '120px',
                          }}
                        />
                      )
                      : message.text
                  }
                </Box>

                {
                  message.from === character && (
                    <button
                      className='remove-button'
                      type='button'
                      onClick={() => handleRemove(message.id)}
                    >
                      &times;
                    </button>
                  )
                }
              </Text>
            </div>
          ))
        }
      </Box>

      <style jsx>{`
        .remove-button {
          position: absolute;
          top: 4px;
          right: 4px;
          display: none;
          border: none;
          padding: 8px;
          background-color: transparent;
          color: ${appConfig.theme.colors.neutrals[300]};
          cursor: pointer;
        }

        .remove-button:hover {
          border: 1px solid ${appConfig.theme.colors.neutrals[300]};
          transform: scale(1.2);
          transition: .3s;
        }

        .message-item:hover .remove-button {
          display: block !important;
        }
      `}</style>
    </>
  )
}