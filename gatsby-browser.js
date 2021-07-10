import React from "react"
import { TooltipProvider } from "./src/contexts/tooltipContext"
import { ThemeProvider } from "./src/contexts/themeContext"

export const wrapRootElement = ({ element }) => (
  <TooltipProvider>
    <ThemeProvider>{element}</ThemeProvider>
  </TooltipProvider>
)
