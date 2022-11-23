/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { theme } from 'twin.macro'
import Lottie from 'lottie-react'
import { toast } from 'react-toastify'
import { useNetwork } from 'wagmi'

import loadingJson from 'assets/jsons/loading.json'

import { useFetchEstimatedFee } from 'hooks/useFetchEstimatedFee'
import { useTransfer } from 'hooks/useTransfer'

import { SUPPORTED_NETWORK } from 'constants/index'
import { Transaction } from 'types'
import { subtract } from 'utils/numbers'

import { Toast } from 'components/Toast'
import { ArrowLeftIcon, HorizontalSwap } from 'components/Svg'
import { PrimaryButton } from 'components/Button'
import { Text } from 'components/Text'
import { EstimatedFeeView } from '../EstimatedFeeView'

interface Props {
  initialTx: Transaction
  onBack: () => void
  onSuccess: () => void
}

export const StepTwo: React.FC<Props> = (props) => {
  const { onBack, onSuccess, initialTx } = props
  const { chain } = useNetwork()
  const { fee, formattedFee } = useFetchEstimatedFee(chain?.id)
  const { onTransfer, process, data, error, isSuccess } = useTransfer(initialTx, fee)

  const [showWaiting, setShowWaiting] = useState<boolean>(false)

  const fromNetwork = SUPPORTED_NETWORK.find((n) => n.chainIds.includes(initialTx?.fromNetwork))
  const toNetwork = SUPPORTED_NETWORK.find((n) => n.chainIds.includes(initialTx?.toNetwork))

  useEffect(() => {
    if (data && isSuccess) {
      setShowWaiting(false)
      toast(
        <Toast
          message="Your transaction is completed successfully."
          actionButton={
            <a
              href={`${chain?.blockExplorers?.default?.url}/tx/${data.transactionHash}`}
              target="_blank"
              className="text-link"
              rel="noreferrer"
            >
              View on Explorer
            </a>
          }
        />,
      )
      onSuccess()
      return
    }

    if (error) {
      onShowError(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isSuccess])

  const onShowError = useCallback((error: any) => {
    setShowWaiting(false)
    const message = error?.message?.includes('user rejected transaction')
      ? 'User rejected transaction'
      : error?.message || error || 'An error occurred. Please try again'

    toast(<Toast type="error" message={message} />, {
      type: 'error',
    })
  }, [])

  const estimatedReceived = useMemo(
    () => subtract(initialTx.amount.value, formattedFee),
    [initialTx.amount.value, formattedFee],
  )

  const _onTransfer = useCallback(async () => {
    setShowWaiting(true)
    try {
      await onTransfer()
    } catch (error) {
      onShowError(error)
    }
  }, [onTransfer, onShowError])

  return (
    <div>
      <div className="flex items-center mb-6">
        <ArrowLeftIcon className="mr-5 cursor-pointer" width={24} height={24} onClick={onBack} />
        <Text color={theme`colors.color9`} fontWeight={600} large>
          Confirmation
        </Text>
      </div>

      <div className="flex flex-col sm:flex-row items-center mb-6">
        {/* From */}
        <div className="flex-1 w-full p-4 border border-color1 bg-color3 cursor-not-allowed">
          <Text fontSize="12px" mb="8px" color={theme`colors.color6`}>
            From network
          </Text>

          <div className="flex items-center">
            <img className="w-6 h-6 mr-3" src={fromNetwork?.icon} alt="network-icon" />
            <Text fontSize="18px" color={theme`colors.color7`}>
              {fromNetwork?.label}
            </Text>
          </div>
        </div>

        <div className="p-3 my-4 sm:my-0 sm:mx-6 border border-color1 bg-color3 cursor-not-allowed">
          <HorizontalSwap width={37} height={37} color={theme`colors.color7`} />
        </div>

        {/* To */}
        <div className="flex-1 w-full p-4 border border-color1 bg-color3 cursor-not-allowed">
          <Text fontSize="12px" mb="8px" color={theme`colors.color6`}>
            To network
          </Text>

          <div className="flex items-center">
            <img className="w-6 h-6 mr-3" src={toNetwork?.icon} alt="network-icon" />
            <Text fontSize="18px" color={theme`colors.color7`}>
              {toNetwork?.label}
            </Text>
          </div>
        </div>
      </div>

      <div className="flex items-center p-4 border border-color1 bg-color3 cursor-not-allowed">
        <img className="w-5 h-5 mr-3" src="./images/logo.png" alt="" />
        <Text large color={theme`colors.color9`}>
          {`${initialTx?.amount?.value} GLCH`}
        </Text>
      </div>

      <EstimatedFeeView show fee={formattedFee} estimatedReceived={estimatedReceived} />

      {showWaiting ? (
        <div className="mt-6 flex items-center">
          <div>
            <Lottie className="w-[72px] h-[72px]" animationData={loadingJson} autoPlay loop />
          </div>
          <Text fontSize="12px" color={theme`colors.color7`}>
            {process === 'confirmation'
              ? 'Waiting for blockchain confirmation...'
              : process === 'approve'
              ? 'Approve transfer GLCH on Metamask...'
              : process === 'transfer'
              ? 'Start transfer on Metamask'
              : 'Please wait...'}
          </Text>
        </div>
      ) : (
        <PrimaryButton className="w-full mt-6" onClick={_onTransfer}>
          <span>Transfer</span>
        </PrimaryButton>
      )}
    </div>
  )
}
