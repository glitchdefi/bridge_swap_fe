import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 16 16" {...props}>
      <path
        d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM8 13.8125C4.79063 13.8125 2.1875 11.2094 2.1875 8C2.1875 4.79063 4.79063 2.1875 8 2.1875C11.2094 2.1875 13.8125 4.79063 13.8125 8C13.8125 11.2094 11.2094 13.8125 8 13.8125Z"
        fill="currentColor"
      />
      <path
        d="M7.25 5.25C7.25 5.44891 7.32902 5.63968 7.46967 5.78033C7.61032 5.92098 7.80109 6 8 6C8.19891 6 8.38968 5.92098 8.53033 5.78033C8.67098 5.63968 8.75 5.44891 8.75 5.25C8.75 5.05109 8.67098 4.86032 8.53033 4.71967C8.38968 4.57902 8.19891 4.5 8 4.5C7.80109 4.5 7.61032 4.57902 7.46967 4.71967C7.32902 4.86032 7.25 5.05109 7.25 5.25V5.25ZM8.375 7H7.625C7.55625 7 7.5 7.05625 7.5 7.125V11.375C7.5 11.4438 7.55625 11.5 7.625 11.5H8.375C8.44375 11.5 8.5 11.4438 8.5 11.375V7.125C8.5 7.05625 8.44375 7 8.375 7Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default Icon
