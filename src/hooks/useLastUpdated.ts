import { MutableRefObject, useCallback, useState } from 'react'
import { usePreviousValue } from './usePreviousValue'

/**
 * A helper hook to keep track of the time between events
 * Can also be used to force an effect to re-run
 */
export const useLastUpdated = (): {
  lastUpdated: number
  previousLastUpdated: MutableRefObject<undefined>
  setLastUpdated: () => void
} => {
  const [lastUpdated, setStateLastUpdated] = useState(() => Date.now())
  const previousLastUpdated = usePreviousValue(lastUpdated)

  const setLastUpdated = useCallback(() => {
    setStateLastUpdated(Date.now())
  }, [setStateLastUpdated])

  return { lastUpdated, previousLastUpdated, setLastUpdated }
}
