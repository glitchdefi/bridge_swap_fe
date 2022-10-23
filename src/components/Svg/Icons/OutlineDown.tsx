import React from 'react'
import { theme } from 'twin.macro'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 16 16" {...props}>
      <path
        d="M13.8125 4H12.6406C12.5609 4 12.4859 4.03906 12.439 4.10313L7.99995 10.2219L3.56089 4.10313C3.51402 4.03906 3.43902 4 3.35933 4H2.18745C2.08589 4 2.02652 4.11563 2.08589 4.19844L7.59527 11.7937C7.79527 12.0687 8.20464 12.0687 8.40308 11.7937L13.9125 4.19844C13.9734 4.11563 13.914 4 13.8125 4V4Z"
        fill={theme`colors.primary`}
      />
    </Svg>
  )
}

export default Icon
