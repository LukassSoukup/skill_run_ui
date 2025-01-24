"use client"

import React from "react"
import { useTheme } from "@/app/context/ThemeProvider"
import { Sun, Moon } from "lucide-react"
import StylesWrapper from "./ThemeWrapper"

const DARK_MODE = process.env.NEXT_PUBLIC_THEME_DARK_MODE || "business";
const WHITE_MODE = process.env.NEXT_PUBLIC_THEME_LIGHT_MODE || "nord";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()

  const switchTheme = (): void => {
    setTheme(isDarkTheme() ? WHITE_MODE : DARK_MODE)
  }

  const isDarkTheme = () : boolean => theme === DARK_MODE;

  return (
    <StylesWrapper className="p-16 absolute">
      <button
        data-theme={isDarkTheme() ? WHITE_MODE : DARK_MODE}
        onClick={switchTheme}
        className="fixed top-4 right-4 p-2 rounded-full shadow-lg z-50"
        aria-label="Toggle theme"
      >
        {isDarkTheme() ? <Sun size={24} /> : <Moon  size={24} />}
      </button>
    </StylesWrapper>
  )
}

export default ThemeChanger

