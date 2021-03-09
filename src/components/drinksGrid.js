import React, { useState } from "react"
import Drink from "./drink"
import shuffle from "lodash.shuffle"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Flex from "./flex"
import CustomButton from "./customButton"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 174px);
  margin-bottom: 8px;
  grid-gap: 8px;
`

const getCompareMap = (a, b) => ({
  "star-asc": a.rating - b.rating,
  "star-desc": b.rating - a.rating,
  "kcal-asc": a.calories - b.calories,
  "kcal-desc": b.calories - a.calories,
  "prep-asc": a.prep - b.prep,
  "prep-desc": b.prep - a.prep,
})

const DrinksGrid = props => {
  const {
    allDrinkDataJson: { nodes: drinks },
  } = useStaticQuery(graphql`
    {
      allDrinkDataJson {
        nodes {
          id
          name
          ingredients
          directions
          url
          imageUrl
          prep
          rating
          calories
        }
      }
    }
  `)

  const caloriesFrom = parseInt(props.calories.split("-")[0])
  const caloriesTo = parseInt(props.calories.split("-")[1])

  const [currentPage, setCurrentPage] = useState(0)
  const filteredDrinks = shuffle(
    drinks.filter(
      drink =>
        (!props.calories ||
          (parseInt(drink.calories) >= caloriesFrom &&
            parseInt(drink.calories) <= caloriesTo)) &&
        (!props.exclude ||
          !(
            drink.name.toLowerCase().includes(props.exclude) ||
            drink.ingredients.toLowerCase().includes(props.exclude)
          )) &&
        (drink.name.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
          drink.ingredients
            .toLowerCase()
            .includes(props.searchQuery.toLowerCase()))
    )
  )

  return (
    <>
      <Grid>
        {filteredDrinks
          .sort((a, b) =>
            a.name.toLowerCase().includes(props.searchQuery.toLowerCase()) &&
            !b.name.toLowerCase().includes(props.searchQuery.toLowerCase())
              ? -1
              : 0
          )
          .slice(currentPage * 20, currentPage * 20 + 20)
          .sort((a, b) => getCompareMap(a, b)[props.sortBy])
          .map(drink => (
            <Drink key={drink.id} size="md" {...drink} />
          ))}
      </Grid>
      <Flex justifyContent="center">
        {[...Array(Math.ceil(filteredDrinks.length / 20)).keys()].map(num => (
          <CustomButton
            color={num === currentPage ? "#a0a4a8" : "#af8e69"}
            hoverColor={num === currentPage ? "#a0a4a8" : "#7b4c2a"}
            margin="8px 4px"
            padding="8px"
            onClick={() => setCurrentPage(num)}
          >
            {num + 1}
          </CustomButton>
        ))}
      </Flex>
    </>
  )
}

export default React.memo(DrinksGrid)
