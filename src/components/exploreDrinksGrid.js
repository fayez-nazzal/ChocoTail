import React, { useState, useEffect, useLayoutEffect } from "react"
import Drink from "./Drink"
import shuffle from "lodash.shuffle"
import useFilteredDrinks from "../hooks/useFilteredDrinks"
import styled, { keyframes } from "styled-components"
import Flex from "./Flex"
import CustomButton from "./CustomButton"
import useMedia from "../hooks/useMedia"
import { bounceInUp } from "react-animations"

const DrinksGrid = props => {
  const viewportMedia = useMedia()
  const [countPerPage, setCountPerPage] = useState(20)
  const caloriesLimits = props.calories && {
    from: parseInt(props.calories.split("-")[0]),
    to: parseInt(props.calories.split("-")[1]),
  }

  const drinks = shuffle(
    useFilteredDrinks(caloriesLimits, props.searchQuery, props.exclude)
  )

  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    setCurrentPage(0)
  }, [props.searchQuery])

  useLayoutEffect(() => {
    if (viewportMedia) {
      setCountPerPage(
        viewportMedia.xxlg ? 30 : viewportMedia.xs || viewportMedia.sm ? 16 : 20
      )
    }
  }, [viewportMedia])

  const viewDrinks = drinks
    .sort((a, b) =>
      a.name.toLowerCase().includes(props.searchQuery.toLowerCase()) &&
      !b.name.toLowerCase().includes(props.searchQuery.toLowerCase())
        ? -1
        : 0
    )
    .slice(
      currentPage * countPerPage,
      currentPage * countPerPage + countPerPage
    )
    .sort((a, b) => getCompareMap(a, b)[props.sortBy])

  return (
    <>
      <Grid key={props.searchQuery}>
        {viewDrinks.length ? (
          viewDrinks.map(drink => <Drink key={drink.id} {...drink} />)
        ) : (
          <NoDrinks>
            No drinks to display{" "}
            <span role="img" aria-label="slightly-sad">
              🙁
            </span>
          </NoDrinks>
        )}
      </Grid>
      <Flex wraps justifyContent="center">
        {[...Array(Math.ceil(drinks.length / countPerPage)).keys()].map(num => (
          <CustomButton
            key={num}
            margin="8px 4px"
            padding="8px"
            borderRadius="4px"
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

const bounceInAnimation = keyframes`${bounceInUp}`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 174px);
  margin-bottom: 8px;
  grid-gap: 8px;
  animation: ${bounceInAnimation} 0.52s;

  // for iMac Retina, MacBook, MacBook Pro
  @media only screen and (min-width: 2000px) {
    grid-template-columns: repeat(6, 1fr);
  }

  // for HIDPI and up desktop & laptop screens
  @media only screen and (min-width: 1920px) {
    grid-template-rows: repeat(5, minmax(200px, 240px));
  }

  // extra small screen devices
  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(8, minmax(150px, 160px));
  }
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
