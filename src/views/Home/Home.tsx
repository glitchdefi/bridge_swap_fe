/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react'
import { styled, theme } from 'twin.macro'
import { useAccount, useNetwork } from 'wagmi'

import { checkUnsupportedChain } from 'utils/checkUnsupportedChain'
import { Transaction } from 'types'

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
  position: relative;
  padding: 32px;

  .unsupported-overlay {
    background-color: ${theme`colors.color5`};
    opacity: 0.5;
  }
`

const Home: React.FC = () => {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  const [step, setStep] = useState<number>(1)
  const [transaction, setTransaction] = useState<Transaction>({
    fromNetwork: null,
    toNetwork: null,
    amount: {
      value: '',
      hasError: false,
    },
  })

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
                initialTx={transaction}
                onNext={(tx: Transaction) => {
                  setTransaction(tx)
                  setStep(2)
                }}
              />
            )}
            {step === 2 && (
              <StepTwo
                initialTx={transaction}
                onSuccess={() => {
                  // Reset data
                  setTransaction({
                    fromNetwork: null,
                    toNetwork: null,
                    amount: {
                      value: '',
                      hasError: false,
                    },
                  })
                  setStep(1)
                }}
                onBack={() => {
                  setStep(1)
                }}
              />
            )}
            {isConnected && checkUnsupportedChain(chain?.id) && (
              <div className="unsupported-overlay absolute top-0 left-0 right-0 bottom-0 cursor-not-allowed" />
            )}
          </CardContent>
        </Card>
      </Wrapper>
    </>
  )
}

export default Home
