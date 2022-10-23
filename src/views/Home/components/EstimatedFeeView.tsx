import React from 'react'
import { theme } from 'twin.macro'

import { Text } from 'components/Text'

interface Props {
  show: boolean
  fee: string
  estimatedReceived: string
}

export const EstimatedFeeView: React.FC<Props> = (props) => {
  const { show, fee, estimatedReceived } = props
  return (
    <div className="mt-6">
      <div className="flex items-center mb-3">
        <Text color={theme`colors.color7`} className="mr-4">
          Estimated transaction fee:
        </Text>
        <Text color={theme`colors.color8`}>{fee && show ? fee : '--'}</Text>
      </div>

      <div className="flex items-center">
        <Text color={theme`colors.color7`} className="mr-4">
          Estimated received:
        </Text>
        {estimatedReceived && show ? (
          <div className="flex items-center">
            <img className="w-6 h-6 mr-2" src="./images/logo.png" alt="glitch-logo" />
            <Text color={theme`colors.success`}>{estimatedReceived}</Text>
          </div>
        ) : (
          <Text color={theme`colors.color8`}>--</Text>
        )}
      </div>
    </div>
  )
}
