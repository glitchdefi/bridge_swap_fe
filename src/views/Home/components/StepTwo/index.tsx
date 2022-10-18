import React from 'react'
import { theme } from 'twin.macro'

import { ArrowLeftIcon, HorizontalSwap } from 'components/Svg'
import { PrimaryButton } from 'components/Button'
import { Text } from 'components/Text'
import { EstimatedFeeView } from '../EstimatedFeeView'

interface Props {
  onBack: () => void
}

export const StepTwo: React.FC<Props> = (props) => {
  const { onBack } = props

  return (
    <div>
      <div className="flex items-center mb-6">
        <ArrowLeftIcon className="mr-5 cursor-pointer" width={24} height={24} onClick={onBack} />
        <Text color={theme`colors.color9`} fontWeight={600} large>
          Confirmation
        </Text>
      </div>

      <div className="flex items-center mb-6">
        {/* From */}
        <div className="flex-1 p-4 border border-color1 bg-color3 cursor-not-allowed">
          <Text fontSize="12px" mb="8px" color={theme`colors.color6`}>
            From network
          </Text>

          <div className="flex items-center">
            <img className="w-6 h-6 mr-3" src="./images/logo-eth.png" alt="network-icon" />
            <Text fontSize="18px" color={theme`colors.color7`}>
              Ethereum
            </Text>
          </div>
        </div>

        <div className="p-3 mx-6 border border-color1 bg-color3 cursor-not-allowed">
          <HorizontalSwap width={37} height={37} color={theme`colors.color7`} />
        </div>

        {/* To */}
        <div className="flex-1 p-4 border border-color1 bg-color3 cursor-not-allowed">
          <Text fontSize="12px" mb="8px" color={theme`colors.color6`}>
            To network
          </Text>

          <div className="flex items-center">
            <img className="w-6 h-6 mr-3" src="./images/logo-bnb.png" alt="network-icon" />
            <Text fontSize="18px" color={theme`colors.color7`}>
              Binance Smart Chain
            </Text>
          </div>
        </div>
      </div>

      <div className="flex items-center p-4 border border-color1 bg-color3 cursor-not-allowed">
        <img className="w-5 h-5 mr-3" src="./images/logo.png" alt="" />
        <Text large color={theme`colors.color9`}>
          100 GLCH
        </Text>
      </div>

      <EstimatedFeeView />

      <PrimaryButton className="w-full mt-6">
        <span>Transfer</span>
      </PrimaryButton>
    </div>
  )
}
