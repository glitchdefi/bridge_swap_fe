import React from 'react'
import { theme } from 'twin.macro'

import { Text } from 'components/Text'
import { Spin } from 'components/Loader'

interface Props {
  show: boolean
  fee: string
  estimatedReceived: string
  loading?: boolean
}

export const EstimatedFeeView: React.FC<Props> = (props) => {
  const { show, fee, estimatedReceived, loading } = props
  return (
    <div className="mt-6">
      <div className="flex items-center mb-3">
        <Text color={theme`colors.color7`} className="mr-4">
          Estimated transaction fee:
        </Text>
        {loading ? (
          <Spin size={16} color={theme`colors.primary`} />
        ) : (
          <Text color={theme`colors.color8`}>{fee && show ? Number(fee)?.toFixed(6) : '--'}</Text>
        )}
      </div>

      <div className="flex items-center">
        <Text color={theme`colors.color7`} className="mr-4">
          Estimated received:
        </Text>
        {loading ? (
          <Spin size={16} color={theme`colors.primary`} />
        ) : estimatedReceived && show ? (
          <div className="flex items-center">
            <img className="w-6 h-6 mr-2" src="./images/logo.png" alt="glitch-logo" />
            <Text color={theme`colors.success`}>{Number(estimatedReceived)?.toFixed(6)}</Text>
          </div>
        ) : (
          <Text color={theme`colors.color8`}>--</Text>
        )}
      </div>
    </div>
  )
}
