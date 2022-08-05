import { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Fuse from "fuse.js"

const lower = str => str.toLowerCase()

const useFavoriteDrinks = searchQuery => {
  const [drinks, setDrinks] = useState([])
  const [searchData, setSearchData] = useState(drinks)

  useEffect(() => {
    // fetch drinks from local storage
    const drinks = JSON.parse(localStorage.getItem("drinks"))

    if (drinks) {
      setDrinks(drinks)
    }
  }, [])

  const setFavoriteDrinks = newDrinks => {
    setDrinks(newDrinks)
    localStorage.setItem("drinks", JSON.stringify(newDrinks))
  }

  useEffect(() => {
    if (searchQuery) {
      const fuse = new Fuse(drinks, {
        shouldSort: true,
        findAllMatches: true,
        keys: ["name", "summary", "ingredients", "directions"],
      })

      const fuseSearchData = fuse.search(searchQuery)

      setSearchData(fuseSearchData.map(item => item.item))
    } else {
      setSearchData(drinks)
    }
  }, [searchQuery, drinks])

  return [drinks, setFavoriteDrinks]
}

export default useFavoriteDrinks
