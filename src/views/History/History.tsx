import React from 'react'
import { useRouter } from 'next/router'
import { styled, theme } from 'twin.macro'

// Components
import { Text } from 'components/Text'
import { ArrowLeftIcon } from 'components/Svg'
import { SelectWalletView } from './components/SelectWalletView'
import { HistoryTable } from './components/HistoryTable'

const Wrapper = styled.div`
  margin-top: 32px;
`

const Card = styled.div`
  background-color: ${theme`colors.color5`};
  max-width: 912px;
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
          <div className="mb-4">
            <SelectWalletView />
          </div>
          <HistoryTable />
        </CardContent>
      </Card>
    </Wrapper>
  )
}
