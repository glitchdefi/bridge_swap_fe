import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

// import { Home } from 'views/Home'

const Home = dynamic(() => import('views/Home/Home'), { ssr: false })

const Index: NextPage = (props) => {
  return <Home {...props} />
}

export default Index
