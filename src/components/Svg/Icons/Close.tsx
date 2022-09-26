import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 40 40" {...props}>
      <path d="M29.843 9.0256L30.9742 10.1568L10.1566 30.9728L9.02539 29.8424L29.843 9.0256Z" fill="white" />
      <path d="M10.1566 9.0256L30.9742 29.8416L29.843 30.9736L9.02539 10.1576L10.1566 9.0256Z" fill="white" />
    </Svg>
  )
}

export default Icon
