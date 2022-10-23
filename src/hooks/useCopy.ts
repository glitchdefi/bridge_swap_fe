import { useCallback } from 'react'
import { toast } from 'react-toastify'

export const useCopy = (): {
  onCopy: (text: string) => void
} => {
  const onCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied successfully')
  }, [])

  return {
    onCopy,
  }
}
