import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Drink from "../components/drink"
import CustomButton from "../components/customButton"

const shuffle = require("lodash.shuffle")

const Container = styled.div`
  .info {
    position: absolute;
    top: 80px;
    left: 24px;

    @media only screen and (max-width: 768px) {
      left: 14px;
    }
  }

  .choco-bubbles {
    width: 100vw;
    height: 420px;
    z-index: -2;
    user-select: none;
  }

  .mug {
    position: absolute;
    top: 4vh;
    right: 24vw;
    z-index: -1;
    user-select: none;
    @media only screen and (max-width: 768px) {
      display: none;
    }
  }

  h2 {
    margin-bottom: 4px;
  }
`

const StyledPTitle = styled.h1`
  font-size: 48px;
  width: 420px;
`

const StyledP = styled.p`
  font-size: 22px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 150px 150px;
  grid-gap: 8px;
  margin: 8px;

  .top1 {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }

  @media only screen and (max-width: 768px) {
    grid-gap: 6px;
    grid-template-rows: 120px 120px;

    .top2 {
      grid-column: 3 / 5;
      grid-row: 1 / 3;
    }

    .top3,
    .top4,
    .top5 {
      display: none;
    }
  }
`

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: space-around;
  justify-content: space-around;
`

const IndexPage = ({ data }) => {
  const [scrolled, setScrolled] = useState(false)

  const mostRatedDrinks = useRef(
    shuffle(data.allDrinkDataJson.nodes.filter(({ rating }) => rating === "5"))
      .slice(0, 5)
      .map(drink => <Drink key={drink.id} {...drink} size="md" />)
  )

  useEffect(() => {
    window.addEventListener("wheel", onWheelMove)

    return () => window.removeEventListener("wheel", onWheelMove)
  }, [])

  const onWheelMove = e => {
    const isDown = e.deltaY > 0
    const topOfPage = window.scrollY < 100

    if (!isDown && !topOfPage) return

    setScrolled(isDown)
  }

  const handleExploreClicked = () => {
    setScrolled(!scrolled)
  }

  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches

  return (
    <Layout homePageScrolled={scrolled} homePage>
      <Container scrolled={scrolled}>
        <StaticImage
          src="../images/choco-bubbles.jpg"
          alt="background"
          className="choco-bubbles"
          quality={100}
          placeholder="blurred"
        />
        <StaticImage
          src="../images/mug.png"
          alt="mug"
          className="mug"
          quality={90}
          placeholder="none"
        />
        <div className="info">
          <StyledPTitle>Keep Calm and prepare your mug</StyledPTitle>
          <StyledP>Explore a vast list of drinks</StyledP>
          <CustomButton
            borderRadius="30px"
            padding="8px 32px"
            color="#f5d4a2"
            hoverColor="#7a4c2a"
            margin="20px 0 0 20px"
            onClick={handleExploreClicked}
          >
            Explore Now
          </CustomButton>
        </div>
        <Grid>
          <Drink
            {...data.allDrinkDataJson.nodes.find(drink =>
              drink.directions.includes("[top1]")
            )}
            auto
            bigFont
            bigStar
            maxChar={32}
            className="top1"
          />
          <Drink
            {...data.allDrinkDataJson.nodes.find(drink =>
              drink.directions.includes("[top2]")
            )}
            auto
            bigFont={isSmallScreen}
            bigStar={isSmallScreen}
            maxChar={20}
            className="top2"
          />
          <Drink
            {...data.allDrinkDataJson.nodes.find(drink =>
              drink.directions.includes("[top3]")
            )}
            auto
            maxChar={20}
            className="top3"
          />
          <Drink
            {...data.allDrinkDataJson.nodes.find(drink =>
              drink.directions.includes("[top4]")
            )}
            auto
            maxChar={20}
            className="top4"
          />
          <Drink
            {...data.allDrinkDataJson.nodes.find(drink =>
              drink.directions.includes("[top5]")
            )}
            auto
            maxChar={20}
            className="top5"
          />
        </Grid>
        <h2>Most Rated</h2>
        <Flex>{mostRatedDrinks.current}</Flex>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
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
`
