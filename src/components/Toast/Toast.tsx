import React from 'react'
import { styled, theme } from 'twin.macro'

import { CheckIcon, ErrorIcon } from 'components/Svg'
import { Text } from 'components/Text'

const Wrapper = styled.div`
  display: flex;
`

interface Props {
  title?: string
  type?: 'error' | 'success'
  message: string
  actionButton?: React.ReactNode
}

export const Toast: React.FC<Props> = (props) => {
  const { title, type, message, actionButton } = props

  const color = type === 'error' ? theme`colors.fail` : theme`colors.success`
  return (
    <Wrapper>
      {type === 'error' ? (
        <ErrorIcon className="!self-start mr-4 mt-[2px]" color={color} />
      ) : (
        <CheckIcon className="!self-start mr-4 mt-[2px]" color={color} />
      )}
      <div>
        <Text className="mb-3" large fontWeight={600} color={color}>
          {title || type === 'error' ? 'Error!' : 'Successful!'}
        </Text>
        <Text color={theme`colors.color7`}>{message}</Text>
        {React.isValidElement(actionButton) && <div className="mt-6">{React.cloneElement(actionButton)}</div>}
      </div>
    </Wrapper>
  )
}
