import { CheckCircleIcon } from 'components/Svg'
import { Text } from 'components/Text'
import React from 'react'
import { styled, theme } from 'twin.macro'

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

export const HistoryTable: React.FC = () => {
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
        <tr>
          <td>
            <div className="flex items-start p-4">
              <img className="w-5 h-5 mr-2 mt-1" src="./images/logo-eth.png" alt="logo" />
              <div>
                <Text color={theme`colors.color9`}>Ethereum</Text>
                <Text color={theme`colors.primary`}>0xc059...03d9</Text>
              </div>
            </div>
          </td>
          <td>
            <div className="flex items-start p-4">
              <img className="w-5 h-5 mr-2 mt-1" src="./images/logo-bnb.png" alt="logo" />
              <div>
                <Text color={theme`colors.color9`}>Binance Smart Chain</Text>
                <Text color={theme`colors.primary`}>0x9a8d...ad52</Text>
              </div>
            </div>
          </td>
          <td>
            <div className="p-4">
              <Text color={theme`colors.color9`}>12 Jul, 2021</Text>
              <Text fontSize="12px" color={theme`colors.color6`}>
                04:17:56 GMT
              </Text>
            </div>
          </td>
          <td>
            <div className="flex justify-end p-4">
              <Text color={theme`colors.color9`}>100.0000 GLCH</Text>
            </div>
          </td>
          <td>
            <div className="flex justify-center p-4">
              <CheckCircleIcon />
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div className="flex items-start p-4">
              <img className="w-5 h-5 mr-2 mt-1" src="./images/logo-eth.png" alt="logo" />
              <div>
                <Text color={theme`colors.color9`}>Ethereum</Text>
                <Text color={theme`colors.primary`}>0xc059...03d9</Text>
              </div>
            </div>
          </td>
          <td>
            <div className="flex items-start p-4">
              <img className="w-5 h-5 mr-2 mt-1" src="./images/logo-bnb.png" alt="logo" />
              <div>
                <Text color={theme`colors.color9`}>Binance Smart Chain</Text>
                <Text color={theme`colors.primary`}>0x9a8d...ad52</Text>
              </div>
            </div>
          </td>
          <td>
            <div className="p-4">
              <Text color={theme`colors.color9`}>12 Jul, 2021</Text>
              <Text fontSize="12px" color={theme`colors.color6`}>
                04:17:56 GMT
              </Text>
            </div>
          </td>
          <td>
            <div className="flex justify-end p-4">
              <Text color={theme`colors.color9`}>100.0000 GLCH</Text>
            </div>
          </td>
          <td>
            <div className="flex justify-center p-4">
              <CheckCircleIcon />
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div className="flex items-start p-4">
              <img className="w-5 h-5 mr-2 mt-1" src="./images/logo-eth.png" alt="logo" />
              <div>
                <Text color={theme`colors.color9`}>Ethereum</Text>
                <Text color={theme`colors.primary`}>0xc059...03d9</Text>
              </div>
            </div>
          </td>
          <td>
            <div className="flex items-start p-4">
              <img className="w-5 h-5 mr-2 mt-1" src="./images/logo-bnb.png" alt="logo" />
              <div>
                <Text color={theme`colors.color9`}>Binance Smart Chain</Text>
                <Text color={theme`colors.primary`}>0x9a8d...ad52</Text>
              </div>
            </div>
          </td>
          <td>
            <div className="p-4">
              <Text color={theme`colors.color9`}>12 Jul, 2021</Text>
              <Text fontSize="12px" color={theme`colors.color6`}>
                04:17:56 GMT
              </Text>
            </div>
          </td>
          <td>
            <div className="flex justify-end p-4">
              <Text color={theme`colors.color9`}>100.0000 GLCH</Text>
            </div>
          </td>
          <td>
            <div className="flex justify-center p-4">
              <CheckCircleIcon />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="flex items-start p-4">
              <img className="w-5 h-5 mr-2 mt-1" src="./images/logo-eth.png" alt="logo" />
              <div>
                <Text color={theme`colors.color9`}>Ethereum</Text>
                <Text color={theme`colors.primary`}>0xc059...03d9</Text>
              </div>
            </div>
          </td>
          <td>
            <div className="flex items-start p-4">
              <img className="w-5 h-5 mr-2 mt-1" src="./images/logo-bnb.png" alt="logo" />
              <div>
                <Text color={theme`colors.color9`}>Binance Smart Chain</Text>
                <Text color={theme`colors.primary`}>0x9a8d...ad52</Text>
              </div>
            </div>
          </td>
          <td>
            <div className="p-4">
              <Text color={theme`colors.color9`}>12 Jul, 2021</Text>
              <Text fontSize="12px" color={theme`colors.color6`}>
                04:17:56 GMT
              </Text>
            </div>
          </td>
          <td>
            <div className="flex justify-end p-4">
              <Text color={theme`colors.color9`}>100.0000 GLCH</Text>
            </div>
          </td>
          <td>
            <div className="flex justify-center p-4">
              <CheckCircleIcon />
            </div>
          </td>
        </tr>
      </tbody>
    </StyledTable>
  )
}
