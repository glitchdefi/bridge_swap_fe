/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { useDebounce } from 'use-lodash-debounce'

import { usePolkadotApi } from 'contexts/PolkadotApi/hooks'

import { useMetamask } from 'hooks/useMetamask'
import { useGlitchBalance } from 'hooks/useGlitchBalance'
import { useMinMaxAmount } from 'hooks/useMinMaxAmount'

import { checkUnsupportedChain } from 'utils/checkUnsupportedChain'

import { SUPPORTED_NETWORK } from 'constants/index'
import { glitchChainId } from 'constants/supportedNetworks'
import { Transaction } from 'types'
import { calculateEstimatedReceived } from 'utils/calculateEstimatedReceived'

// Components
import { MetamaskNotDetectedModal } from 'components/Shared/MetamaskNotDetectedModal'
import { PrimaryButton } from 'components/Button'
import { calculateEstimatedFee } from 'utils/calculateEstimatedFee'
import { AmountInput } from './AmountInput'
import { BalanceView } from './BalanceView'
import { SelectNetwork } from './SelectNetwork'
// import { SwitchButton } from './SwitchButton'
import { EstimatedFeeView } from '../EstimatedFeeView'

export const DROPDOWN_DATA = [
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
  const { onConnect, error: connectError } = useMetamask()
  const { chain } = useNetwork()
  const {
    data: { formattedBalance },
  } = useGlitchBalance()
  const {
    formatted: { minAmount, maxAmount },
  } = useMinMaxAmount()
  const {
    accountSelected,
    onConnect: onConnectGlitchWallet,
    isWalletConnected: isGlitchWalletConnected,
    isHasExtension: isHasGlitchExtension,
    getSubstrateEstimateFee,
  } = usePolkadotApi()

  const [transaction, setTransaction] = useState<Transaction>({
    fromNetwork: DROPDOWN_DATA[0].value[1], // ChainId
    toNetwork: DROPDOWN_DATA[2].value[1], // ChainId
    amount: {
      value: '',
      hasError: false,
    },
    fee: '',
  })
  const [isOpenMetamaskNotDetectedModal, setIsOpenMetamaskNotDetectedModal] = useState<boolean>(false)
  const [isFetchingTxFee, setIsFetchingTxFee] = useState<boolean>(false)
  const debouncedAmount = useDebounce(transaction.amount.value, 500)

  const estimatedAmountReceived = useMemo(
    () => calculateEstimatedReceived(transaction.amount.value, transaction.fee),
    [transaction.amount.value, transaction.fee],
  )
  const estimatedFee = useMemo(
    () => calculateEstimatedFee(transaction.fee, transaction.amount.value),
    [transaction.fee, transaction.amount],
  )
  const isContinueDisabled = useMemo(() => {
    return (
      !transaction.amount.value ||
      transaction.amount.hasError ||
      !transaction.fromNetwork ||
      !transaction.toNetwork ||
      Number(estimatedAmountReceived) <= 0 ||
      !isGlitchWalletConnected ||
      !isHasGlitchExtension ||
      !accountSelected
    )
  }, [transaction, estimatedAmountReceived, isGlitchWalletConnected, isHasGlitchExtension, accountSelected])

  const showEstimatedFee = transaction.fee && !!transaction.amount.value && !!transaction.fromNetwork

  useEffect(() => {
    if (initialTx) setTransaction(initialTx)
  }, [initialTx])

  useEffect(() => {
    if (connectError && connectError?.message?.includes('Connector not found') && !isOpenMetamaskNotDetectedModal) {
      setIsOpenMetamaskNotDetectedModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectError])

  useEffect(() => {
    async function getFee() {
      if (accountSelected && parseFloat(debouncedAmount) > 0) {
        // setIsFetchingTxFee(true)
        const fee = await getSubstrateEstimateFee(accountSelected, debouncedAmount)
        setTransaction((prev) => ({ ...prev, fee }))
      } else {
        setTransaction((prev) => ({ ...prev, fee: '' }))
      }
      // setIsFetchingTxFee(false)
    }
    getFee()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAmount, accountSelected])

  const toggleMetamaskNotDetectedModal = useCallback(() => {
    setIsOpenMetamaskNotDetectedModal((prev) => !prev)
  }, [])

  // const switchNetwork = useCallback(() => {
  //   setTransaction({
  //     ...transaction,
  //     fromNetwork: transaction.toNetwork,
  //     toNetwork: transaction.fromNetwork,
  //   })
  // }, [transaction])

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
        <div className="my-4 sm:my-0 sm:mx-4" />
        {/* <SwitchButton onClick={switchNetwork} /> */}
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
        minAmount={minAmount as number}
        maxAmount={maxAmount as number}
        showConnectGlitchWallet={
          !isGlitchWalletConnected ||
          ((transaction.fromNetwork === glitchChainId || transaction.toNetwork === glitchChainId) &&
            !isHasGlitchExtension)
        }
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
        onConnectGlitchWallet={onConnectGlitchWallet}
      />

      <EstimatedFeeView
        loading={isFetchingTxFee}
        show={showEstimatedFee}
        fee={estimatedFee}
        estimatedReceived={estimatedAmountReceived}
      />
      {renderButton()}

      {/* Modals */}
      <MetamaskNotDetectedModal isOpen={isOpenMetamaskNotDetectedModal} onClose={toggleMetamaskNotDetectedModal} />
    </div>
  )
}
