/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'

import { useMetamask } from 'hooks/useMetamask'
import { useGlitchBalance } from 'hooks/useGlitchBalance'
import { useFetchEstimatedFee } from 'hooks/useFetchEstimatedFee'

import { subtract } from 'utils/numbers'
import { checkUnsupportedChain } from 'utils/checkUnsupportedChain'

import { SUPPORTED_NETWORK } from 'constants/index'
import { glitchChainId } from 'constants/supportedNetworks'
import { Transaction } from 'types'

// Components
import { PrimaryButton } from 'components/Button'
import { AmountInput } from './AmountInput'
import { BalanceView } from './BalanceView'
import { SelectNetwork } from './SelectNetwork'
import { SwitchButton } from './SwitchButton'
import { EstimatedFeeView } from '../EstimatedFeeView'

const DROPDOWN_DATA = [
  { ...SUPPORTED_NETWORK[0], value: SUPPORTED_NETWORK[0].chainIds, iconCls: 'w-7 h-7' },
  { ...SUPPORTED_NETWORK[1], value: SUPPORTED_NETWORK[1].chainIds, iconCls: 'w-7 h-7' },
  { ...SUPPORTED_NETWORK[2], value: SUPPORTED_NETWORK[2].chainIds, iconCls: 'w-7 h-7' },
]
interface Props {
  initialTx: Transaction
  onNext: (tx: Transaction) => void
}

export const StepOne: React.FC<Props> = ({ initialTx, onNext }) => {
  const { isConnected } = useAccount()
  const { onConnect } = useMetamask()
  const { chain } = useNetwork()
  const {
    data: { formattedBalance },
  } = useGlitchBalance()
  const { fee, formattedFee } = useFetchEstimatedFee(chain?.id)

  const [transaction, setTransaction] = useState<Transaction>({
    fromNetwork: null, // ChainId
    toNetwork: null, // ChainId
    amount: {
      value: '',
      hasError: false,
    },
  })

  const estimatedReceived = useMemo(
    () => subtract(transaction.amount.value, formattedFee),
    [transaction.amount.value, formattedFee],
  )
  const isContinueDisabled =
    !transaction.amount.value ||
    transaction.amount.hasError ||
    !transaction.fromNetwork ||
    !transaction.toNetwork ||
    Number(estimatedReceived) <= 0
  const showEstimatedFee = fee && !!transaction.amount.value && !!transaction.fromNetwork

  useEffect(() => {
    if (initialTx) setTransaction(initialTx)
  }, [initialTx])

  useEffect(() => {
    // TODO
    // listener provider change -> set input, output
  }, [])

  const switchNetwork = useCallback(() => {
    setTransaction({
      ...transaction,
      fromNetwork: transaction.toNetwork,
      toNetwork: transaction.fromNetwork,
    })
  }, [transaction])

  const onContinue = useCallback(() => {
    if (!isContinueDisabled) {
      onNext(transaction)
    }
  }, [isContinueDisabled, transaction, onNext])

  const renderButton = useCallback(() => {
    if (isConnected && checkUnsupportedChain(chain?.id)) {
      return (
        <PrimaryButton className="w-full mt-6 disabled">
          <span>Unsupported network</span>
        </PrimaryButton>
      )
    }

    if (isConnected && transaction.fromNetwork !== glitchChainId) {
      return (
        <PrimaryButton className={`w-full mt-6 ${isContinueDisabled ? 'disabled' : ''}`} onClick={onContinue}>
          <span>Continue</span>
        </PrimaryButton>
      )
    }

    if (transaction.fromNetwork === glitchChainId) {
      return (
        <PrimaryButton className="w-full mt-6" onClick={onConnect}>
          <img src="./images/logo.png" alt="glitch-logo" />
          <span>Connect with Glitch</span>
        </PrimaryButton>
      )
    }

    return (
      <PrimaryButton className="w-full mt-6" onClick={onConnect}>
        <img src="./images/logo-metamask.png" alt="metamask-logo" />
        <span>Connect with Metamask</span>
      </PrimaryButton>
    )
  }, [isConnected, chain, transaction.fromNetwork, isContinueDisabled, onContinue, onConnect])

  return (
    <div>
      <div className="flex flex-col items-center justify-center sm:flex-row ">
        <SelectNetwork
          isFrom
          value={transaction.fromNetwork}
          list={DROPDOWN_DATA}
          onChange={(chainId: number) => {
            setTransaction({
              ...transaction,
              fromNetwork: chainId,
              toNetwork: null,
            })
          }}
        />
        <SwitchButton onClick={switchNetwork} />
        <SelectNetwork
          value={transaction.toNetwork}
          list={DROPDOWN_DATA?.filter((n) => !n.chainIds?.includes(transaction.fromNetwork))}
          onChange={(chainId: number) => setTransaction({ ...transaction, toNetwork: chainId })}
        />
      </div>

      <div className="mt-6 mb-2">
        <BalanceView balance={formattedBalance} />
      </div>

      {/* Amount */}
      <AmountInput
        isFromGlitchNetwork={transaction.fromNetwork === glitchChainId}
        isConnected={isConnected}
        value={transaction.amount.value}
        balance={formattedBalance}
        onChange={(amount: string, hasError: boolean) => {
          setTransaction({
            ...transaction,
            amount: {
              value: amount,
              hasError,
            },
          })
        }}
      />

      <EstimatedFeeView show={showEstimatedFee} fee={formattedFee} estimatedReceived={estimatedReceived} />
      {renderButton()}
    </div>
  )
}
