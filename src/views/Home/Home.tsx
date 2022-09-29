/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { styled, theme } from 'twin.macro'
import { PrimaryButton } from 'components/Button'
import { OutlineDownArrow } from 'components/Svg'
import { Text } from 'components/Text'
import { AmountInput } from './components/AmountInput'
import { BalanceView } from './components/BalanceView'
import { SwitchButton } from './components/SwitchButton'

const Wrapper = styled.div`
  margin-top: 32px;
`

const Card = styled.div`
  background-color: ${theme`colors.color5`};
  max-width: 912px;
  margin: 0px auto;
`

const CardHeader = styled.div`
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

const SelectInput = styled.div`
  padding: 16px;
  border: 1px solid ${theme`colors.color4`};
  user-select: none;
  cursor: pointer;
  flex: 1;
`

const Home: React.FC = () => {
  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <Text bold color={theme`colors.color2`}>
            Glitch Bridge
          </Text>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <SelectInput>
              <Text fontSize="12px" mb="8px" color={theme`colors.color6`}>
                From network
              </Text>
              <div className="flex items-center justify-between">
                <Text fontSize="18px" color={theme`colors.color7`}>
                  Select network
                </Text>
                <OutlineDownArrow />
              </div>
            </SelectInput>

            <SwitchButton />

            <SelectInput>
              <Text fontSize="12px" mb="8px" color={theme`colors.color6`}>
                To network
              </Text>
              <div className="flex items-center justify-between">
                <Text fontSize="18px" color={theme`colors.color7`}>
                  Select network
                </Text>
                <OutlineDownArrow />
              </div>
            </SelectInput>
          </div>

          <div className="mt-6 mb-2">
            <BalanceView />
          </div>

          <AmountInput />

          <PrimaryButton className="w-full mt-6">
            <img src="./images/logo-metamask.png" alt="metamask-logo" />
            <span>Connect with Metamask</span>
          </PrimaryButton>
        </CardContent>
      </Card>
    </Wrapper>
  )
}

export default Home
