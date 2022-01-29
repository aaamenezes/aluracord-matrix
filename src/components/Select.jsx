import { TextField } from '@skynexui/components';
import React from 'react'
import appConfig from '../../config.json';

export default function Select({ cavesData, character, handleChange }) {
  const dataListList = cavesData.map(character => (
    <option key={character.id} value={character.name} />
  ))

  return (
    <>
      <datalist id="caves-characteres">{dataListList}</datalist>
      <TextField
        list='caves-characteres'
        fullWidth
        value={character}
        onChange={handleChange}
        textFieldColors={{
          neutral: {
            textColor: appConfig.theme.colors.neutrals[200],
            mainColor: appConfig.theme.colors.neutrals[900],
            mainColorHighlight: appConfig.theme.colors.primary[500],
            backgroundColor: appConfig.theme.colors.neutrals[800],
          }
        }}
      />
    </>
  )
}
