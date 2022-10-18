import React from 'react'
import { theme } from 'twin.macro'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 16 16" {...props}>
      <path
        d="M13.6244 7.40625H4.48225L9.95412 2.65625C10.0416 2.57969 9.9885 2.4375 9.87287 2.4375H8.49006C8.42912 2.4375 8.37131 2.45937 8.326 2.49844L2.42131 7.62187C2.36723 7.66875 2.32386 7.72671 2.29413 7.79181C2.26441 7.85692 2.24902 7.92765 2.24902 7.99922C2.24902 8.07079 2.26441 8.14152 2.29413 8.20663C2.32386 8.27173 2.36723 8.32968 2.42131 8.37656L8.36037 13.5312C8.38381 13.5516 8.41193 13.5625 8.44162 13.5625H9.87131C9.98693 13.5625 10.0401 13.4187 9.95256 13.3438L4.48225 8.59375H13.6244C13.6932 8.59375 13.7494 8.5375 13.7494 8.46875V7.53125C13.7494 7.4625 13.6932 7.40625 13.6244 7.40625Z"
        fill={theme`colors.primary`}
      />
    </Svg>
  )
}

export default Icon
