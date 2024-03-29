import React from 'react'
import { styled, theme } from 'twin.macro'
import { useRouter } from 'next/router'

import { HistoryOutline } from 'components/Svg'
import { Text } from 'components/Text'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 12px;
  padding-right: 12px;
  border: 1px solid ${theme`colors.color1`};
  min-height: 37px;
  cursor: pointer;
`

export const HistoryBox: React.FC = () => {
  const router = useRouter()
  return (
    <Wrapper onClick={() => router.push('/history')}>
      <HistoryOutline className="mr-3" />
      <Text color={theme`colors.primary`}>History</Text>
    </Wrapper>
  )
}
