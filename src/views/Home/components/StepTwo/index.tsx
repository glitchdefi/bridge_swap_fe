/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { theme } from 'twin.macro'
import Lottie from 'lottie-react'
import { toast } from 'react-toastify'
import { useNetwork } from 'wagmi'
import { fromWei } from 'web3-utils'

import loadingJson from 'assets/jsons/loading.json'

import { useTransfer } from 'hooks/useTransfer'
import { useMinMaxAmount } from 'hooks/useMinMaxAmount'

import { SUPPORTED_NETWORK } from 'constants/index'
import { Transaction } from 'types'

import { calculateEstimatedReceived } from 'utils/calculateEstimatedReceived'
import { calculateEstimatedFee } from 'utils/calculateEstimatedFee'

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
  const {
    onTransfer,
    allowanceRefetch,
    onApprove,
    error,
    approveProcess,
    approvedData,
    isApprovedSuccess,
    transferData,
    transferProcess,
    isTransferSuccess,
  } = useTransfer(initialTx, initialTx.fee)
  const { minAmountRefetch, maxAmountRefetch } = useMinMaxAmount()

  /**
   * state
   */
  const [showWaiting, setShowWaiting] = useState<boolean>(false)
  const [step, setStep] = useState<'approve' | 'transfer'>('approve')

  const fromNetwork = SUPPORTED_NETWORK.find((n) => n.chainIds.includes(initialTx?.fromNetwork))
  const toNetwork = SUPPORTED_NETWORK.find((n) => n.chainIds.includes(initialTx?.toNetwork))

  const estimatedReceived = useMemo(
    () => calculateEstimatedReceived(initialTx.amount.value, initialTx.fee),
    [initialTx.amount.value, initialTx.fee],
  )
  const estimatedFee = useMemo(
    () => calculateEstimatedFee(initialTx.fee, initialTx.amount.value),
    [initialTx.fee, initialTx.amount],
  )

  useEffect(() => {
    const fetchAllowance = async () => {
      const allowanceResult = await allowanceRefetch()
      const allowance = fromWei(allowanceResult.data.toString())

      if (Number(allowance) >= Number(initialTx.amount.value)) {
        setStep('transfer')
      }
    }

    fetchAllowance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (error) {
      onShowError(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  useEffect(() => {
    if (approvedData && isApprovedSuccess) {
      setTimeout(() => {
        setShowWaiting(false)
        toast(
          <Toast
            message="Approved successfully."
            actionButton={
              <a
                href={`${chain?.blockExplorers?.default?.url}/tx/${approvedData.transactionHash}`}
                target="_blank"
                className="text-link"
                rel="noreferrer"
              >
                View on Explorer
              </a>
            }
          />,
        )
        setStep('transfer')
      }, 5000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvedData, isApprovedSuccess])

  useEffect(() => {
    if (transferData && isTransferSuccess) {
      setShowWaiting(false)
      toast(
        <Toast
          message="Your transaction is completed successfully."
          actionButton={
            <a
              href={`${chain?.blockExplorers?.default?.url}/tx/${transferData.transactionHash}`}
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferData, isTransferSuccess])

  const onShowError = useCallback((error: any) => {
    setShowWaiting(false)

    const message = error?.message?.includes('user rejected transaction')
      ? 'User rejected transaction'
      : error?.message?.includes('burn amount exceeds')
      ? 'Insufficient Balance'
      : error?.message || error || 'An error occurred. Please try again'

    toast(<Toast type="error" message={message} />, {
      type: 'error',
    })
  }, [])

  const _onTransfer = useCallback(async () => {
    setShowWaiting(true)
    try {
      // check amount with min and max amount -> in case min, max amount has change from contract
      const minMaxResult = await Promise.all([minAmountRefetch(), maxAmountRefetch()])
      if (minMaxResult?.length && !minMaxResult?.[0]?.isError && !minMaxResult?.[1]?.isError) {
        const [minAmount, maxAmount] = minMaxResult
        const transformMinAmount = Number(fromWei(minAmount.data.toString()))
        const transformMaxAmount = Number(fromWei(maxAmount.data.toString()))

        if (Number(initialTx.amount.value) < transformMinAmount) {
          onShowError('Amount is less than min amount')
          return
        }

        if (Number(initialTx.amount.value) > transformMaxAmount) {
          onShowError('Amount is greater than max amount')
          return
        }
      }

      const allowanceResult = await allowanceRefetch()
      const allowance = fromWei(allowanceResult.data.toString())

      // If not approved, ask to approve
      // 1. allowance = 0 || amount > allowance
      if (!Number(allowance) || Number(initialTx.amount.value) > Number(allowance)) {
        await onApprove()
      } else {
        await onTransfer()
      }
    } catch (error) {
      onShowError(error)
    }
  }, [onApprove, onShowError, allowanceRefetch, onTransfer, initialTx.amount, minAmountRefetch, maxAmountRefetch])

  return (
    <div>
      <div className="flex items-center mb-6">
        <ArrowLeftIcon
          className="mr-5 cursor-pointer"
          width={24}
          height={24}
          onClick={() => {
            if (!showWaiting) {
              onBack()
            }
          }}
        />
        <Text color={theme`colors.color9`} fontWeight={600} large>
          Confirmation
        </Text>
      </div>

      <div className="flex flex-col items-center mb-6 sm:flex-row">
        {/* From */}
        <div className="flex-1 w-full p-4 border cursor-not-allowed border-color1 bg-color3">
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

        <div className="p-3 my-4 border cursor-not-allowed sm:my-0 sm:mx-6 border-color1 bg-color3">
          <HorizontalSwap width={37} height={37} color={theme`colors.color7`} />
        </div>

        {/* To */}
        <div className="flex-1 w-full p-4 border cursor-not-allowed border-color1 bg-color3">
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

      <div className="flex items-center p-4 border cursor-not-allowed border-color1 bg-color3">
        <img className="w-5 h-5 mr-3" src="./images/logo.png" alt="" />
        <Text large color={theme`colors.color9`}>
          {`${initialTx?.amount?.value} GLCH`}
        </Text>
      </div>

      <EstimatedFeeView show fee={estimatedFee} estimatedReceived={estimatedReceived} />

      {showWaiting ? (
        <div className="flex items-center mt-6">
          <div>
            <Lottie className="w-[72px] h-[72px]" animationData={loadingJson} autoPlay loop />
          </div>
          {step === 'approve' ? (
            <Text fontSize="12px" color={theme`colors.color7`}>
              {approveProcess === 'confirmation'
                ? 'Waiting for blockchain confirmation...'
                : approveProcess === 'approve'
                ? 'Approve transfer GLCH on Metamask...'
                : 'Please wait...'}
            </Text>
          ) : (
            <Text fontSize="12px" color={theme`colors.color7`}>
              {transferProcess === 'confirmation'
                ? 'Waiting for blockchain confirmation...'
                : transferProcess === 'transfer'
                ? 'Start transfer on Metamask'
                : 'Please wait...'}
            </Text>
          )}
        </div>
      ) : (
        <PrimaryButton className="w-full mt-6" onClick={_onTransfer}>
          <span>{step === 'approve' ? 'Approve transfer' : 'Start Transfer'}</span>
        </PrimaryButton>
      )}
    </div>
  )
}
