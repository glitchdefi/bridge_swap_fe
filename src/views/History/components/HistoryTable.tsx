import React from 'react'
import { styled, theme } from 'twin.macro'
import { useNetwork } from 'wagmi'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import { TransactionHistory } from 'types'
import { truncateAddress } from 'utils/strings'
import { numberWithCommas } from 'utils/numbers'
import { GLITCH_EXPLORER } from 'constants/index'

import { CheckCircleIcon } from 'components/Svg'
import { Text } from 'components/Text'
import { Spin } from 'components/Loader'
import { fromWei } from 'web3-utils'
import moment from 'moment'
import { AddressDropdownTypes } from './SelectWalletView'

const StyledTableWrapper = styled.div`
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) var(--color-3);

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-primary);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--color-3);
    border-radius: 4px;
  }
`

const StyledTable = styled.table`
  width: 100%;

  thead {
    background-color: var(--color-3);
    height: 36px;
  }

  thead th {
    padding-left: 16px;
    padding-right: 16px;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: var(--color-7);
  }

  tbody tr {
    box-shadow: inset 0px -1px 0px var(--color-4);
  }

  a:hover {
    text-decoration: underline;
  }

  .empty-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px 0px;

    .empty-message {
      color: var(--color-1);
    }
  }
`

interface HistoryTableProps {
  loading: boolean
  addressSelected: AddressDropdownTypes
  data: TransactionHistory[]
}

export const HistoryTable: React.FC<HistoryTableProps> = (props) => {
  const { loading, data, addressSelected } = props

  const { chain } = useNetwork()

  return (
    <div tw="relative">
      {loading && (
        <div tw="absolute flex items-center justify-center h-full w-full z-10">
          <Spin />
        </div>
      )}
      <StyledTableWrapper className="overflow-x-auto">
        <StyledTable className="table-auto">
          <thead>
            <tr>
              <th className="text-left">Tx hash</th>
              <th className="text-left">From (network)</th>
              <th className="text-left">To (network)</th>
              <th className="text-right w-[200px]">Time</th>
              <th className="text-end">Amount</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.length ? (
              data.map((t: TransactionHistory, i: number) => {
                const {
                  tx_eth_hash,
                  extrinsic_hash,
                  from_eth_address,
                  to_glitch_address,
                  amount,
                  net_amount,
                  glitch_timestamp,
                  eth_timestamp,
                } = t
                const explorerUrl = addressSelected?.isEthAddress
                  ? `${chain?.blockExplorers?.default?.url}/tx/${tx_eth_hash}`
                  : `${GLITCH_EXPLORER}/tx/${extrinsic_hash}`
                const txHash = addressSelected?.isEthAddress ? tx_eth_hash : extrinsic_hash
                const txAmount = addressSelected?.isEthAddress ? amount : net_amount
                const txTime = addressSelected?.isEthAddress ? Number(eth_timestamp) * 1000 : Number(glitch_timestamp)

                return (
                  <tr key={`${i}`}>
                    <td>
                      <div className="flex items-start p-4">
                        <Text
                          as="a"
                          target="_blank"
                          rel="noreferrer"
                          href={explorerUrl}
                          color={theme`colors.primary`}
                          data-tooltip-id="tx-hash"
                          data-tooltip-content={txHash}
                        >
                          {truncateAddress(txHash)}
                        </Text>
                        <ReactTooltip id="tx-hash" />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-start p-4">
                        <img className="w-5 h-5 mt-1 mr-2" src="./images/logo-eth.png" alt="logo" />
                        <div>
                          <Text color={theme`colors.color9`}>Ethereum</Text>
                          <Text
                            data-tooltip-id="tx-from"
                            data-tooltip-content={from_eth_address}
                            color={theme`colors.primary`}
                          >
                            {truncateAddress(from_eth_address)}
                          </Text>
                          <ReactTooltip id="tx-from" />
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
                            data-tooltip-content={to_glitch_address}
                            className="to-link"
                            color={theme`colors.primary`}
                          >
                            {truncateAddress(to_glitch_address)}
                          </Text>
                          <ReactTooltip id="tx-to" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col justify-end p-4 w-[200px]">
                        <Text textAlign="right" color={theme`colors.color9`}>
                          {txTime ? moment(txTime).utc().format('DD MMM, YYYY') : '-'}
                        </Text>
                        <Text fontSize="12px" textAlign="right" color={theme`colors.color6`}>
                          {txTime ? `${moment(txTime).utc().format('h:mm:ss A')} GMT` : '-'}
                        </Text>
                      </div>
                    </td>

                    <td>
                      <div className="flex justify-end p-4">
                        <Text textAlign="right" color={theme`colors.color9`}>
                          {txAmount ? numberWithCommas(fromWei(txAmount)) : 0} GLCH
                        </Text>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center p-4">
                        <CheckCircleIcon />
                      </div>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="empty-wrapper">
                    <div className="empty-message">No data</div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </StyledTableWrapper>
    </div>
  )
}
