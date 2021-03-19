import React, { useState, createContext } from "react"

export const TooltipContext = createContext()

export const TooltipProvider = props => {
  // initialized valueState to the full state array
  // so that consumers can useContext as they are using useState
  const valueState = useState("")

  return (
    <TooltipContext.Provider value={valueState}>
      {props.children}
    </TooltipContext.Provider>
  )
}
