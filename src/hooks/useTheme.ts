import { useContext } from 'react'
import { ThemeContext } from 'styles/theme/themeContext'

export const useTheme = (): { isDark: boolean } => {
  const themeContext = useContext(ThemeContext)

  if (themeContext === undefined) {
    throw new Error('Theme context undefined')
  }

  const { theme } = themeContext

  return {
    isDark: theme === 'dark',
  }
}
