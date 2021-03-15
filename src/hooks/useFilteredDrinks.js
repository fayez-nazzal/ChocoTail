import { useStaticQuery, graphql } from "gatsby"

const lower = str => str.toLowerCase()

const useFilteredDrinks = (calories, searchQuery, excludes) => {
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
        }
      }
    }
  `)

  const filteredDrinks = drinks.filter(
    drink =>
      (!calories ||
        (parseInt(drink.calories) >= calories.from &&
          parseInt(drink.calories) <= calories.to)) &&
      (!searchQuery ||
        lower(drink.name).includes(lower(searchQuery)) ||
        lower(drink.ingredients).includes(lower(searchQuery))) &&
      (!excludes ||
        !(
          lower(drink.name).includes(excludes) ||
          lower(drink.ingredients).includes(excludes)
        ))
  )

  return filteredDrinks
}

export default useFilteredDrinks
