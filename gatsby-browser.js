import React from "react"
import { TooltipProvider } from "./src/contexts/tooltipContext"
import { ThemeProvider } from "./src/contexts/themeContext"
import { FavoritesProvider } from "./src/contexts/favoritesContext"

export const wrapRootElement = ({ element }) => (
  <FavoritesProvider>
    <TooltipProvider>
      <ThemeProvider>{element}</ThemeProvider>
    </TooltipProvider>
  </FavoritesProvider>
)
