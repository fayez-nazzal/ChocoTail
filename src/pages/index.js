import * as React from "react"
import { useState, useLayoutEffect, useEffect, useRef } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Drink from "../components/drink"
import CustomButton from "../components/customButton"
import useMedia from "../hooks/useMedia"

const shuffle = require("lodash.shuffle")

const Container = styled.div`
  wax-width: 100%;

  .choco-bubbles {
    height: 400px;
    min-width: 100%;
    z-index: -2;
    user-select: none;

    @media only screen and (min-width: 1920px) {
      height: 440px;
    }

    @media only screen and (max-width: 768px) {
      height: 390px;
    }
  }

  .mug {
    position: absolute;
    top: 26px;
    right: 116px;
    z-index: -1;
    user-select: none;

    @media only screen and (min-width: 1920px) {
      top: 48px;
      right: 180px;
    }

    @media only screen and (max-width: 760px) {
      display: none;
    }
  }
`

const InfoContainer = styled.div`
  position: absolute;
  top: 80px;
  left: 24px;

  h1 {
    font-size: 48px;
    width: 420px;
  }

  p {
    margin: 4px 0;
    font-size: 24px;
  }

  // for HIDPI desktops & laptops and up
  @media only screen and (min-width: 1920px) {
    left: 60px;

    h1 {
      width: 500px;
      font-size: 56px;
    }

    p {
      font-size: 36px;
    }
  }

  // for devices like Galaxy Note 5
  @media only screen and (min-width: 400px) and (max-width: 600px) {
    h1 {
      width: 360px;
      font-size: 40px;
    }
    p {
      font-size: 28px;
    }
  }

  // extra small screen devices
  @media only screen and (max-width: 400px) {
    left: 8px;
    h1 {
      width: 280px;
      font-size: 34px;
    }
  }
`

const ShowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, minmax(120px, 180px));
  grid-gap: 8px;
  margin: 8px;
  box-sizing: border-box;

  .top1 {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }

  .top6 {
    display: none;
  }

  // for iMac Retina, MacBook, MacBook Pro and HIDPI-XL desktops & laptops
  @media only screen and (min-width: 2000px) {
    grid-template-rows: repeat(2, minmax(160px, 260px));
  }

  // for desktop & laptop
  @media only screen and (min-width: 1024px) {
    .top1 {
      grid-column: 1;
    }

    .top2 {
      grid-row: 1 / 3;
    }

    .top6 {
      display: block;
    }
  }

  @media only screen and (min-width: 1024px) and (max-width: 2000px) {
    grid-template-columns: 1.5fr 1.5fr repeat(2, 1fr);
  }

  // for devices like Galaxy Note 5
  @media only screen and (min-width: 400px) and (max-width: 600px) {
    grid-template-rows: repeat(2, minmax(180px, 240px));
  }

  // for extra small screen devices
  @media only screen and (max-width: 600px) {
    grid-auto-rows: 180px;

    .top1 {
      grid-column: 1 / 5;
    }

    .top1 {
      grid-row: 1;
    }

    .top2 {
      grid-column: 1 / 5;
      grid-row: 2;
    }

    .top3,
    .top4,
    .top5 {
      display: none;
    }
  }
`

const MostRatedDiv = styled.div`
  margin: 8px;
  wax-width: 100%;
  box-sizing: border-box;

  h2 {
    margin-bottom: 4px;
  }
`

const MostRatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(140px, 194px));
  grid-auto-rows: minmax(80px, 170px);
  grid-gap: 8px;

  // for iMac Retina, MacBook, MacBook Pro
  @media only screen and (min-width: 2000px) {
    grid-template-columns: repeat(6, minmax(220px, 420px));
    grid-auto-rows: minmax(170px, 370px);
  }

  // for desktop
  @media only screen and (min-width: 1024px) and (max-width: 2000px) {
    grid-template-columns: repeat(5, minmax(200px, 320px));
    grid-auto-rows: minmax(140px, 250px);
  }

  // tablets
  @media only screen and (min-width: 600px) and (max-width: 1024px) {
    grid-template-columns: repeat(4, minmax(100px, 250px));
    grid-auto-rows: minmax(50px, 190px);
  }

  // extra small screen devices
  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(100px, 240px));
    grid-auto-rows: minmax(50px, 180px);
  }

  // extra small screen devices but excluding devices like galaxy note 5
  @media only screen and (max-width: 400px) {
    grid-template-columns: repeat(2, minmax(100px, 210px));
    grid-auto-rows: minmax(50px, 150px);
  }
`

const IndexPage = props => {
  const [scrolled, setScrolled] = useState(false)
  const viewportMedia = useMedia()
  const lastScrollY = useRef(window.scrollY)
  const mostRatedDrinks = useRef(
    shuffle(
      props.data.allDrinkDataJson.nodes.filter(({ rating }) => rating === "5")
    )
  )
  const [mostRatedDrinksCount, setMostRatedDrinksCount] = useState(5)

  useEffect(() => {
    window.addEventListener("scroll", onWheelMove)

    return () => window.removeEventListener("scroll", onWheelMove)
  }, [])

  useLayoutEffect(() => {
    if (viewportMedia) {
      const newMostRatedDrinksCount =
        viewportMedia.xs || viewportMedia.sm
          ? 6
          : viewportMedia.md
          ? 12
          : viewportMedia.lg
          ? 10
          : viewportMedia.xlg || viewportMedia.xxlg
          ? 12
          : 0
      setMostRatedDrinksCount(newMostRatedDrinksCount)
    }
  }, [viewportMedia])

  const onWheelMove = () => {
    const isDown = lastScrollY.current < window.scrollY
    const topOfPage = window.scrollY < 100

    if (!isDown && !topOfPage) return

    setScrolled(isDown)
  }

  const handleExploreClicked = () => {
    setScrolled(!scrolled)
  }

  return (
    <Layout homePageScrolled={scrolled} location={props.location}>
      <Container scrolled={scrolled}>
        <StaticImage
          src="../images/choco-bubbles.jpg"
          alt="background"
          className="choco-bubbles"
          quality={90}
          placeholder="blurred"
        />
        <StaticImage
          src="../images/mug.png"
          alt="mug"
          className="mug"
          quality={90}
          placeholder="none"
        />
        <InfoContainer>
          <h1>Keep Calm and prepare your mug</h1>
          <p>Explore a vast list of drinks</p>
          <CustomButton
            borderRadius="30px"
            padding="12px 32px"
            fojntSize="20px"
            color="#f5d4a2"
            hoverColor="#7a4c2a"
            margin="16px 0 0 20px"
            onClick={handleExploreClicked}
          >
            Explore Now
          </CustomButton>
        </InfoContainer>
        <ShowGrid>
          {[...Array(6).keys()].map(index => (
            <Drink
              {...props.data.allDrinkDataJson.nodes.find(drink =>
                drink.directions.includes(`top${index + 1}`)
              )}
              auto
              bigFont={index === 0}
              className={`top${index + 1}`}
            />
          ))}
        </ShowGrid>
        <MostRatedDiv>
          <h2>Most Rated</h2>
          <MostRatedGrid>
            {mostRatedDrinks.current
              .slice(0, mostRatedDrinksCount)
              .map(drink => (
                <Drink key={drink.id} {...drink} />
              ))}
          </MostRatedGrid>
        </MostRatedDiv>
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
