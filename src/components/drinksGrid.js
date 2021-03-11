import React, { useState } from "react"
import Drink from "./drink"
import shuffle from "lodash.shuffle"
import useFilteredDrinks from "../hooks/useFilteredDrinks"
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

const NoDrinks = styled.div`
  margin-top: 32px;
  grid-column: 1 / 4;
  grid-row: 1 / 6;
  font-size: 36px;
  line-height: 36px;
  text-align: center;
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
  const caloriesLimits = props.calories && {
    from: parseInt(props.calories.split("-")[0]),
    to: parseInt(props.calories.split("-")[1]),
  }

  const drinks = shuffle(
    useFilteredDrinks(caloriesLimits, props.searchQuery, props.exclude)
  )

  const [currentPage, setCurrentPage] = useState(0)

  const viewDrinks = drinks
    .sort((a, b) =>
      a.name.toLowerCase().includes(props.searchQuery.toLowerCase()) &&
      !b.name.toLowerCase().includes(props.searchQuery.toLowerCase())
        ? -1
        : 0
    )
    .slice(currentPage * 20, currentPage * 20 + 20)
    .sort((a, b) => getCompareMap(a, b)[props.sortBy])

  return (
    <>
      <Grid>
        {viewDrinks.length ? (
          viewDrinks.map(drink => <Drink key={drink.id} size="md" {...drink} />)
        ) : (
          <NoDrinks>
            No drinks to display{" "}
            <span role="img" aria-label="slightly-sad">
              🙁
            </span>
          </NoDrinks>
        )}
      </Grid>
      <Flex justifyContent="center">
        {[...Array(Math.ceil(drinks.length / 20)).keys()].map(num => (
          <CustomButton
            margin="8px 4px"
            padding="8px"
            color={num === currentPage ? "#a0a4a8" : "#af8e69"}
            hoverColor={num === currentPage ? "#a0a4a8" : "#7b4c2a"}
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
