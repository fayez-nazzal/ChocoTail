import React from "react"
import { TooltipProvider } from "./src/contexts/tooltipContext"

export const wrapRootElement = ({ element }) => (
  <TooltipProvider>{element}</TooltipProvider>
)
