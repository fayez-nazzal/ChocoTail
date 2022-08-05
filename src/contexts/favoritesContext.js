import React, { useState, createContext } from "react"
import useFavoriteDrinks from "../hooks/useFavoriteDrinks"

export const FavoritesContext = createContext()

export const FavoritesProvider = props => {
  const [favoriteDrinks, setFavoriteDrinks] = useFavoriteDrinks()

  const onDrinkFavorite = drink => {
    const favoriteDrinksClone = [...favoriteDrinks]

    favoriteDrinksClone.push(drink)

    setFavoriteDrinks(favoriteDrinksClone)
  }

  const onDrinkUnfavorite = drinkName => {
    const favoriteDrinksClone = [...favoriteDrinks]

    const index = favoriteDrinksClone.findIndex(
      drink => drink.name === drinkName
    )

    favoriteDrinksClone.splice(index, 1)

    setFavoriteDrinks(favoriteDrinksClone)
  }

  return (
    <FavoritesContext.Provider
      value={{ favoriteDrinks, onDrinkFavorite, onDrinkUnfavorite }}
    >
      {props.children}
    </FavoritesContext.Provider>
  )
}
