import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { styled, theme } from 'twin.macro'

// Hooks
import { useAccounts as useGlitchAccounts } from 'hooks/substrate/useAccounts'
import { useAddress } from 'hooks/useAddress'
import { useTransactionHistory } from 'hooks/useTransactionHistory'

import { truncateAddress } from 'utils/strings'

// Components
import { Text } from 'components/Text'
import { ArrowLeftIcon } from 'components/Svg'
import { Pagination } from 'components/Pagination'
import { AddressDropdownTypes, SelectWalletView } from './components/SelectWalletView'
import { HistoryTable } from './components/HistoryTable'

const Wrapper = styled.div`
  margin-top: 32px;
`

const Card = styled.div`
  background-color: ${theme`colors.color5`};
  max-width: 1024px;
  margin: 0px auto;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 12px;
  padding-bottom: 12px;

  background-color: ${theme`colors.color3`};
  box-shadow: inset 0px -1px 0px ${theme`colors.color4`};
`

const CardContent = styled.div`
  padding: 32px;
`

export const History: React.FC = () => {
  const router = useRouter()
  const { address } = useAddress()
  const { allAccounts } = useGlitchAccounts()

  const [addressSelected, setAddressSelected] = useState<AddressDropdownTypes | null>()

  const { isLoading, transactionHistory, hasNext, pagination, onPageChange } = useTransactionHistory(
    addressSelected?.value,
  )

  const isShowSelectWallet = address || !!allAccounts?.length

  const combineAddresses = useMemo(() => {
    if (isShowSelectWallet) {
      return (address ? [address, ...allAccounts] : allAccounts)?.map((addr) => ({
        label: truncateAddress(addr),
        value: addr,
        isEthAddress: addr?.startsWith('0x'),
      }))
    }

    return []
  }, [isShowSelectWallet, address, allAccounts])

  useEffect(() => {
    if (combineAddresses?.length && !addressSelected) {
      setAddressSelected(combineAddresses[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combineAddresses])

  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <div role="button" tabIndex={0} onClick={() => router.push('/')}>
            <ArrowLeftIcon className="mr-4" width={16} height={16} />
          </div>
          <Text bold color={theme`colors.color2`}>
            History
          </Text>
        </CardHeader>
        <CardContent>
          {isShowSelectWallet && (
            <div tw="mb-4">
              <SelectWalletView
                addressSelected={addressSelected}
                setAddressSelected={setAddressSelected}
                data={combineAddresses}
              />
            </div>
          )}
          <HistoryTable loading={isLoading} addressSelected={addressSelected} data={transactionHistory} />
          <Pagination current={pagination.page} isDisabledNext={!hasNext} onChange={onPageChange} />
        </CardContent>
      </Card>
    </Wrapper>
  )
}
