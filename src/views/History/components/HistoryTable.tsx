import { CheckCircleIcon } from 'components/Svg'
import { Text } from 'components/Text'
import React, { useMemo } from 'react'
import { styled, theme } from 'twin.macro'
import { TransactionHistory } from 'types'
import { truncateAddress } from 'utils/strings'
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
`

interface HistoryTableProps {
  addressSelected: AddressDropdownTypes
  data: TransactionHistory[]
}

export const HistoryTable: React.FC<HistoryTableProps> = (props) => {
  const { data, addressSelected } = props

  const filterData = useMemo(() => {
    if (!addressSelected?.value || !data?.length) return []
    return data?.filter((o) => o.from === addressSelected.value || o.to === addressSelected.value)
  }, [addressSelected?.value, data])

  return (
    <StyledTable className="table-auto">
      <thead>
        <tr>
          <th className="text-left">From (network)</th>
          <th className="text-left">To (network)</th>
          <th className="text-left">Time</th>
          <th className="text-end">Amount</th>
          <th className="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        {filterData.map((t: TransactionHistory, i: number) => {
          const { from, to, amount } = t
          return (
            <tr key={`${i}`}>
              <td>
                <div className="flex items-start p-4">
                  <img className="w-5 h-5 mt-1 mr-2" src="./images/logo-eth.png" alt="logo" />
                  <div>
                    <Text color={theme`colors.color9`}>Ethereum</Text>
                    <Text color={theme`colors.primary`}>{truncateAddress(from)}</Text>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-start p-4">
                  <img className="w-5 h-5 mt-1 mr-2" src="./images/logo.png" alt="logo" />
                  <div>
                    <Text color={theme`colors.color9`}>Glitch</Text>
                    <Text color={theme`colors.primary`}>{truncateAddress(to)}</Text>
                  </div>
                </div>
              </td>
              <td>
                <div className="p-4">
                  <Text color={theme`colors.color9`}>-</Text>
                  {/* <Text color={theme`colors.color9`}>12 Jul, 2021</Text>
                  <Text fontSize="12px" color={theme`colors.color6`}>
                    04:17:56 GMT
                  </Text> */}
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
            </tr>
          )
        })}
      </tbody>
    </StyledTable>
  )
}
