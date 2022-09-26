/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react'
import { ThemeKeyType } from './types'
import { getInitialTheme, KEY_THEME_STORAGE } from './utils'

export const ThemeContext = React.createContext(undefined)

export const ThemeProvider: React.FC<{ initialTheme?: string; children: React.ReactNode }> = ({
  initialTheme,
  children,
}) => {
  const [theme, setTheme] = React.useState(getInitialTheme)

  const rawSetTheme = (theme: string) => {
    const root = window.document.documentElement
    const isDark = theme === ThemeKeyType.dark

    root.classList.remove(isDark ? ThemeKeyType.light : ThemeKeyType.dark)
    root.classList.add(theme)

    localStorage.setItem(KEY_THEME_STORAGE, theme)
  }

  if (initialTheme) {
    rawSetTheme(initialTheme)
  }

  React.useEffect(() => {
    rawSetTheme(theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
