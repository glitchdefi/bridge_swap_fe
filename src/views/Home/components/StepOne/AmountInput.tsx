/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useCallback } from 'react'
import { styled, theme } from 'twin.macro'

import { MIN_AMOUNT, MAX_AMOUNT } from 'constants/index'

// Components
import { Text } from 'components/Text'
import { OutlineButton } from 'components/Button'
import { Input } from 'components/Input'
import { InfoOutline } from 'components/Svg'

const Wrapper = styled.div`
  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  .divide {
    height: 24px;
    width: 1px;
    background-color: ${theme`colors.color4`};
    margin-left: 12px;
    margin-right: 12px;
  }
`

const WarningWrapper = styled.div`
  margin-top: 8px;
  padding-top: 9px;
  padding-bottom: 9px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${theme`colors.color3`};

  display: flex;
  align-items: center;
`

interface Props {
  isConnected: boolean
  isFromGlitchNetwork: boolean
  value: string
  balance: string
  onChange: (amount: string, hasError: boolean) => void
}

export const AmountInput: React.FC<Props> = (props) => {
  const { isConnected, balance, isFromGlitchNetwork, value, onChange } = props
  const [hasError, setHasError] = useState<{
    min: boolean
    max: boolean
    decimals: boolean
  }>({
    min: false,
    max: false,
    decimals: false,
  })

  const onAmountChange = useCallback(
    (event: any) => {
      const { value } = event.target

      const amount = value.replace(/[^0-9.]/g, '')

      // E.g: 100.888888888
      const newValue = amount?.includes('.') ? amount?.split('.')[0] : amount

      const isMinError = newValue && Number(newValue) < Number(MIN_AMOUNT)
      const isMaxError =
        (Number(newValue) === Number(MAX_AMOUNT) && Number(amount?.split('.')[1]) > 0) || Number(newValue) > MAX_AMOUNT
      const isDecimalsError = amount?.split('.')?.length > 0 && amount?.split('.')[1]?.length > 18

      if (isMinError) {
        setHasError({ ...hasError, min: true })
      } else if (isDecimalsError) {
        setHasError({ ...hasError, decimals: true })
      } else if (isMaxError) {
        setHasError({ ...hasError, max: true })
      } else {
        setHasError({ min: false, max: false, decimals: false })
      }

      // onChange(Number(value) > Number(glitchBalance) ? glitchBalance : value)
      onChange(amount, isMinError || isMaxError || isDecimalsError)
    },
    [hasError, onChange],
  )

  const onMaxClick = useCallback(() => {
    setHasError({ min: false, max: false, decimals: false })
    onChange(balance, false)
  }, [balance, onChange])

  return (
    <>
      <Wrapper>
        <Input
          value={value}
          type="number"
          disabled={!isConnected}
          onChange={onAmountChange}
          leftComponent={<img src="./images/logo.png" alt="glitch-logo" />}
          rightComponent={
            <div className="flex items-center">
              <Text className="hidden sm:block" fontSize="16px" color={theme`colors.color1`}>
                GLCH
              </Text>
              <div className="hidden sm:block divide" />
              <OutlineButton disabled={!isConnected} className="!py-0 !px-2" onClick={onMaxClick}>
                <Text fontSize="12px" color={theme`colors.primary`}>
                  Max
                </Text>
              </OutlineButton>
            </div>
          }
          placeholder="Enter amount"
        />

        {hasError.min && (
          <Text className="mt-2" color={theme`colors.fail`}>
            Amount is less than min amount
          </Text>
        )}
        {hasError.max && (
          <Text className="mt-2" color={theme`colors.fail`}>
            Amount is greater than max amount
          </Text>
        )}
        {hasError.decimals && (
          <Text className="mt-2" color={theme`colors.fail`}>
            Cannot enter more than 18 decimal places.
          </Text>
        )}
      </Wrapper>
      <WarningWrapper>
        <InfoOutline width={16} height={16} mr="10px" color={theme`colors.primary`} />
        <Text fontSize="12px" color={theme`colors.color7`}>
          The minimum amount is 150 GLCH and the maximum is 40,000 GLCH.
        </Text>
      </WarningWrapper>
      {isFromGlitchNetwork && (
        <WarningWrapper className="!mt-6">
          <InfoOutline
            className="!self-start mt-[2px]"
            width={21}
            height={21}
            mr="10px"
            color={theme`colors.pending`}
          />
          <div>
            <Text className="mb-4" color={theme`colors.color7`}>
              In order to transfer GLCH from Ethereum network to Glitch network, you also need to connect to Glitch
              wallet. You do not have Glitch wallet? Download <a className="text-link cursor-pointer">here</a>
            </Text>
            <Text color={theme`colors.color7`}>
              Please click <a className="text-link cursor-pointer">the instruction for installation</a> to see how to
              install Glitch wallet
            </Text>
          </div>
        </WarningWrapper>
      )}
    </>
  )
}
