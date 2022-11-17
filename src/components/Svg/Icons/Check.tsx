import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 16 16" {...props}>
      <path
        d="M14.2493 2.96875H13.1571C13.004 2.96875 12.8587 3.03906 12.7649 3.15937L6.32271 11.3203L3.23365 7.40625C3.18692 7.34692 3.12736 7.29895 3.05943 7.26593C2.99151 7.23292 2.91699 7.21572 2.84146 7.21562H1.74928C1.64459 7.21562 1.58678 7.33594 1.65084 7.41719L5.93053 12.8391C6.13053 13.0922 6.5149 13.0922 6.71646 12.8391L14.3477 3.16875C14.4118 3.08906 14.354 2.96875 14.2493 2.96875Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default Icon