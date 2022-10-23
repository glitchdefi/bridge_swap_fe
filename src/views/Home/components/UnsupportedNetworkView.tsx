import React, { memo } from 'react'
import { styled, theme } from 'twin.macro'

import { WarningCircleIcon } from 'components/Svg'
import { Text } from 'components/Text'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid ${theme`colors.red3`};
  background: rgba(42, 18, 21, 0.5);
  max-width: 912px;
  margin: 0px auto;
  margin-top: 32px;
`

interface Props {
  onSwitchNetwork: () => void
}

export const UnsupportedNetworkView: React.FC<Props> = memo((props) => {
  return (
    <Wrapper>
      <div className="flex items-center flex-1">
        <WarningCircleIcon className="mr-3" width={16} height={16} />
        <Text color={theme`colors.color9`}>You are connected to unsupported network. Please switch your network</Text>
      </div>
      <div role="button" tabIndex={0} className="text-link cursor-pointer" onClick={props.onSwitchNetwork}>
        Switch network
      </div>
    </Wrapper>
  )
})

UnsupportedNetworkView.displayName = 'UnsupportedNetworkView'
