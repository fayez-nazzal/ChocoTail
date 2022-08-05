import React, { useState, useEffect, useLayoutEffect } from "react"
import Drink from "./Drink"
import styled, { keyframes } from "styled-components"
import Flex from "./Flex"
import CustomButton from "./CustomButton"
import useMedia from "../hooks/useMedia"
import { bounceInUp } from "react-animations"

const DrinksGrid = props => {
  const viewportMedia = useMedia()
  const [countPerPage, setCountPerPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(0)

  useLayoutEffect(() => {
    if (viewportMedia) {
      setCountPerPage(
        viewportMedia.xxlg ? 30 : viewportMedia.xs || viewportMedia.sm ? 16 : 20
      )
    }
  }, [viewportMedia])

  useEffect(() => {
    setCurrentPage(0)
  }, [props.drinks])

  const viewDrinks = props.drinks
    .slice(
      currentPage * countPerPage,
      currentPage * countPerPage + countPerPage
    )
    .sort((a, b) => getCompareRxpression(a, b)[props.sortBy])

  return (
    <>
      <Grid key={props.drinks.length}>
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
        {[...Array(Math.ceil(props.drinks.length / countPerPage)).keys()].map(
          num => (
            <CustomButton
              key={num}
              margin="1rem 4px"
              padding="7px 10px"
              borderRadius="8px"
              color={num === currentPage ? "#a0a4a8" : "#af8e69"}
              hoverColor={num === currentPage ? "#a0a4a8" : "#7b4c2a"}
              onClick={() => setCurrentPage(num)}
            >
              {num + 1}
            </CustomButton>
          )
        )}
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
  grid-gap: 1rem;
  animation: ${bounceInAnimation} 0.52s;
  justify-content: center;
  align-items: center;
  justify-items: center;

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
  font-size: 36px;
  line-height: 36px;
  text-align: center;
  // takes all space in grid
  grid-column: 1 / -1;
`

const getCompareRxpression = (a, b) => ({
  "star-asc": a.rating - b.rating,
  "star-desc": b.rating - a.rating,
  "kcal-asc": a.calories - b.calories,
  "kcal-desc": b.calories - a.calories,
  "prep-asc": a.prep - b.prep,
  "prep-desc": b.prep - a.prep,
})
