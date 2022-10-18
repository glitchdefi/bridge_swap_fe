import { DEV } from './dev-config'
import { PROD } from './prod-config'

const ENV = process.env.NODE_ENV === 'production' ? DEV : PROD

export default ENV
