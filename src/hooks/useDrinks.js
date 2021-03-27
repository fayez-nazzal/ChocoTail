import { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Fuse from "fuse.js"

const lower = str => str.toLowerCase()

const useDrinks = (searchQuery, calories, excludes) => {
  const {
    allDrinkDataJson: { nodes: drinks },
  } = useStaticQuery(graphql`
    {
      allDrinkDataJson {
        nodes {
          id
          name
          summary
          ingredients
          directions
          url
          prep
          rating
          calories
          fields {
            slug
          }
        }
      }
    }
  `)
  const [searchData, setSearchData] = useState(drinks)

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

  const filteredDrinks = searchData.filter(
    drink =>
      (!calories ||
        (parseInt(drink.calories) >= calories.from &&
          parseInt(drink.calories) <= calories.to)) &&
      (!excludes ||
        !(
          excludes.some(element => lower(drink.name).includes(element)) ||
          excludes.some(element =>
            lower(drink.ingredients).includes(element)
          ) ||
          excludes.some(element => lower(drink.summary).includes(element))
        ))
  )

  return filteredDrinks
}

export default useDrinks
