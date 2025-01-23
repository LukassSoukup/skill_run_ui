"use client"

import React from "react"
import { WHITE_MODE, DARK_MODE } from "@/app/constants/Styles"
import { useTheme } from "@/app/context/ThemeProvider"
import { Sun, Moon } from "lucide-react"
import StylesWrapper from "./ThemeWrapper"

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()

  const switchTheme = (): void => {
    setTheme(isDarkTheme(theme) ? WHITE_MODE : DARK_MODE)
  }

  const isDarkTheme = (theme: string) : boolean => theme === DARK_MODE;

  return (
    <StylesWrapper className="p-16 absolute" theme={theme}>
      <button
        data-theme={isDarkTheme(theme) ? WHITE_MODE : DARK_MODE}
        onClick={switchTheme}
        className="fixed top-4 right-4 p-2 rounded-full shadow-lg z-50"
        aria-label="Toggle theme"
      >
        {theme === DARK_MODE ? <Sun size={24} /> : <Moon  size={24} />}
      </button>
    </StylesWrapper>
  )
}

export default ThemeChanger

