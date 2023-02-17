import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const History = dynamic<unknown>(() => import('views/History').then((comp) => comp.History), { ssr: false })

const Index: NextPage = (props) => {
  return <History {...props} />
}

export default Index
