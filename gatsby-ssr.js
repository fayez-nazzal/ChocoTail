import React from "react"
import { TooltipProvider } from "./src/contexts/tooltipContext"
import { FavoritesProvider } from "./src/contexts/favoritesContext"
import { ThemeProvider } from "./src/contexts/themeContext"

export const wrapRootElement = ({ element }) => (
  <FavoritesProvider>
    <ThemeProvider>
      <TooltipProvider>{element}</TooltipProvider>
    </ThemeProvider>
  </FavoritesProvider>
)
