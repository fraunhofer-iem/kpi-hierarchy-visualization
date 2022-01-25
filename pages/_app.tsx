import type { AppProps } from "next/app"
import React, { useState } from "react"
import { locales, themes, UIContext, useMediaQuery } from "../lib/hooks"
import "../styles/globals.css"

export default function KPIDashboard({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(themes.light)
  const [locale, setLocale] = useState(locales.english)

  useMediaQuery("(prefers-color-scheme: dark)", (matches) => {
    if (matches) {
      setTheme(themes.dark)
    } else {
      setTheme(themes.light)
    }
  })

  return (
    <UIContext.Provider
      value={{
        theme: theme,
        locale: locale,
        toggleTheme: () => {},
      }}
    >
      <Component {...pageProps} />
    </UIContext.Provider>
  )
}
