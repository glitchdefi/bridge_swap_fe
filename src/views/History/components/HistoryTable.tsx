import React, { useMemo } from 'react'
import { styled, theme } from 'twin.macro'
import { useNetwork } from 'wagmi'
import { Tooltip } from 'react-tooltip'

import { TransactionHistory } from 'types'
import { truncateAddress } from 'utils/strings'

import { CheckCircleIcon } from 'components/Svg'
import { Text } from 'components/Text'
import { AddressDropdownTypes } from './SelectWalletView'

const StyledTable = styled.table`
  width: 100%;

  thead {
    background-color: #1c2a2f;
    height: 36px;
  }

  thead th {
    padding-left: 16px;
    padding-right: 16px;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: #a7c1ca;
  }

  tbody tr {
    box-shadow: inset 0px -1px 0px #23353b;
  }

  a:hover {
    text-decoration: underline;
  }
`

interface HistoryTableProps {
  addressSelected: AddressDropdownTypes
  data: TransactionHistory[]
}

export const HistoryTable: React.FC<HistoryTableProps> = (props) => {
  const { data, addressSelected } = props

  const { chain } = useNetwork()

  const filterData = useMemo(() => {
    if (!addressSelected?.value || !data?.length) return []
    return data?.filter((o) => o.from === addressSelected.value || o.to === addressSelected.value)
  }, [addressSelected?.value, data])

  return (
    <StyledTable className="table-auto">
      <thead>
        <tr>
          <th className="text-left">Tx hash</th>
          <th className="text-left">From (network)</th>
          <th className="text-left">To (network)</th>
          <th className="text-end">Amount</th>
          <th className="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        {filterData.map((t: TransactionHistory, i: number) => {
          const { hash, from, to, amount } = t
          return (
            <tr key={`${i}`}>
              <td>
                <div className="flex items-start p-4">
                  <Text
                    as="a"
                    target="_blank"
                    rel="noreferrer"
                    href={`${chain?.blockExplorers?.default?.url}/tx/${hash}`}
                    color={theme`colors.primary`}
                    data-tooltip-id="tx-hash"
                    data-tooltip-content={hash}
                  >
                    {truncateAddress(hash)}
                  </Text>
                </div>
              </td>
              <td>
                <div className="flex items-start p-4">
                  <img className="w-5 h-5 mt-1 mr-2" src="./images/logo-eth.png" alt="logo" />
                  <div>
                    <Text color={theme`colors.color9`}>Ethereum</Text>
                    <Text data-tooltip-id="tx-from" data-tooltip-content={from} color={theme`colors.primary`}>
                      {truncateAddress(from)}
                    </Text>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-start p-4">
                  <img className="w-5 h-5 mt-1 mr-2" src="./images/logo.png" alt="logo" />
                  <div>
                    <Text color={theme`colors.color9`}>Glitch</Text>
                    <Text
                      data-tooltip-id="tx-to"
                      data-tooltip-content={to}
                      className="to-link"
                      color={theme`colors.primary`}
                    >
                      {truncateAddress(to)}
                    </Text>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex justify-end p-4">
                  <Text color={theme`colors.color9`}>{amount} GLCH</Text>
                </div>
              </td>
              <td>
                <div className="flex justify-center p-4">
                  <CheckCircleIcon />
                </div>
              </td>
              <Tooltip id="tx-hash" />
              <Tooltip id="tx-from" />
              <Tooltip id="tx-to" />
            </tr>
          )
        })}
      </tbody>
    </StyledTable>
  )
}
