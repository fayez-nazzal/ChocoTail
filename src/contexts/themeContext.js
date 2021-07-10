import React, { useState, createContext } from "react"

export const ThemeContext = createContext({
  value: false,
})

export const ThemeProvider = props => {
  const valueState = useState(false)

  return (
    <ThemeContext.Provider value={valueState}>
      {props.children}
    </ThemeContext.Provider>
  )
}
