import React, { useContext } from "react"
import English from "../locales/English"
import DarkTheme from "../themes/Dark"
import LightTheme from "../themes/Light"

export const themes = {
  light: LightTheme,
  dark: DarkTheme,
}

export const locales = {
  english: English,
}

export const UIContext = React.createContext({
  theme: themes.light,
  locale: locales.english,
  toggleTheme: () => {},
})

export const useUIContext = () => {
  return useContext(UIContext)
}
