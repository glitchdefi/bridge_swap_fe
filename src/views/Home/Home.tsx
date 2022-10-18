/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react'
import { styled, theme } from 'twin.macro'
import { useAccount, useNetwork } from 'wagmi'

import { checkUnsupportedChain } from 'utils/checkUnsupportedChain'

// Components
import { Text } from 'components/Text'
import { UnsupportedNetworkView } from './components/UnsupportedNetworkView'
import { StepOne } from './components/StepOne'
import { StepTwo } from './components/StepTwo'

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

const Home: React.FC = () => {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  const [step, setStep] = useState<number>(1)

  return (
    <>
      {isConnected && checkUnsupportedChain(chain?.id) && <UnsupportedNetworkView />}
      <Wrapper>
        <Card>
          <CardHeader>
            <Text bold color={theme`colors.color2`}>
              Glitch Bridge
            </Text>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <StepOne
                onNext={() => {
                  // TODO
                  setStep(2)
                }}
              />
            )}
            {step === 2 && (
              <StepTwo
                onBack={() => {
                  setStep(1)
                }}
              />
            )}
          </CardContent>
        </Card>
      </Wrapper>
    </>
  )
}

export default Home
