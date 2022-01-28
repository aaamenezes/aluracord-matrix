import { Image } from '@skynexui/components'
import React from 'react'

export default function () {
  return (
    <>
      <img src='/images/peas.png' />

      <style jsx>{`
        img {
          display: block;
          width: 200px;
          margin: 0 auto;
          animation: rotate infinite 2s linear;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
