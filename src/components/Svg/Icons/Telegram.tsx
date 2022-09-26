import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <g clipPath="url(#clip0_3084_283)">
        <path
          d="M9.41669 15.1814L9.01969 20.7654C9.58769 20.7654 9.83369 20.5214 10.1287 20.2284L12.7917 17.6834L18.3097 21.7244C19.3217 22.2884 20.0347 21.9914 20.3077 20.7934L23.9297 3.82141L23.9307 3.82041C24.2517 2.32441 23.3897 1.73941 22.4037 2.10641L1.11369 10.2574C-0.339311 10.8214 -0.317311 11.6314 0.86669 11.9984L6.30969 13.6914L18.9527 5.78041C19.5477 5.38641 20.0887 5.60441 19.6437 5.99841L9.41669 15.1814Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3084_283">
          <rect width="24" height="24" fill="white" transform="translate(-0.000244141)" />
        </clipPath>
      </defs>
    </Svg>
  )
}

export default Icon
