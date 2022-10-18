/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { SUPPORTED_NETWORK } from 'constants/index'
import { useMetamask } from 'hooks/useMetamask'
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
  onNext: () => void
}

export const StepOne: React.FC<Props> = ({ onNext }) => {
  const { isConnected } = useAccount()
  const { onConnect } = useMetamask()

  const [transaction, setTransaction] = useState<Transaction>({
    fromNetwork: null,
    toNetwork: null,
    amount: {
      value: '',
      hasError: false,
    },
  })

  const isContinueDisabled =
    !transaction.amount.value || transaction.amount.hasError || !transaction.fromNetwork || !transaction.toNetwork

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

  return (
    <div>
      <div className="flex items-center">
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
        <BalanceView />
      </div>

      {/* Amount */}
      <AmountInput
        isFromGlitchNetwork={transaction.fromNetwork === 99}
        isConnected={isConnected}
        value={transaction.amount.value}
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
      <EstimatedFeeView />

      {isConnected && transaction.fromNetwork !== 99 ? (
        <PrimaryButton className={`w-full mt-6 ${isContinueDisabled ? 'disabled' : ''}`} onClick={onNext}>
          <span>Continue</span>
        </PrimaryButton>
      ) : transaction.fromNetwork === 99 ? (
        <PrimaryButton className="w-full mt-6" onClick={onConnect}>
          <img src="./images/logo.png" alt="glitch-logo" />
          <span>Connect with Glitch</span>
        </PrimaryButton>
      ) : (
        <PrimaryButton className="w-full mt-6" onClick={onConnect}>
          <img src="./images/logo-metamask.png" alt="metamask-logo" />
          <span>Connect with Metamask</span>
        </PrimaryButton>
      )}
    </div>
  )
}
