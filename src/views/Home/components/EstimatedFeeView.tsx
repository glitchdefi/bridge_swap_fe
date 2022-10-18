import React from 'react'
import { theme } from 'twin.macro'

import { Text } from 'components/Text'

export const EstimatedFeeView: React.FC = () => {
  return (
    <div className="mt-6">
      <div className="flex items-center mb-3">
        <Text color={theme`colors.color7`} className="mr-4">
          Estimated transaction fee:
        </Text>
        <Text fontWeight={600} color={theme`colors.color8`}>
          --
        </Text>
      </div>

      <div className="flex items-center">
        <Text color={theme`colors.color7`} className="mr-4">
          Estimated received:
        </Text>
        <Text fontWeight={600} color={theme`colors.color8`}>
          --
        </Text>
      </div>
    </div>
  )
}
