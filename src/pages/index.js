import * as React from "react"
import { useState, useLayoutEffect, useEffect, useRef } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Drink from "../components/drink"
import useMedia from "../hooks/useMedia"
import InfoContainer from "../components/infoContainer"
const shuffle = require("lodash.shuffle")

const Container = styled.div`
  wax-width: 100%;
`

const ImagesWrapper = styled.div`
  position: relative;
  height: 500px;
  min-width: 100%;
  z-index: -2;
  user-select: none;

  @media only screen and (min-width: 1920px) {
    height: 600px;
  }

  @media only screen and (max-width: 768px) {
    height: 390px;
  }

  .headline-image {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.6s;
  }

  .headline-image-active {
    opacity: 1;
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
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;

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
  const viewportMedia = useMedia()
  const mostRatedDrinks = useRef(
    shuffle(
      props.data.allDrinkDataJson.nodes.filter(({ rating }) => rating === "5")
    )
  )
  const [mostRatedDrinksCount, setMostRatedDrinksCount] = useState(5)
  const [headlineText, setHeadlineText] = useState("")
  const [activeImages, setActiveImages] = useState([1])

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

  useEffect(() => {
    if (activeImages.length === 1) {
      setTimeout(() => {
        setHeadlineText("Begin your Good Morning.")
        setTimeout(() => {
          setHeadlineText("Cold, hot, whatever you prefer.")
          setActiveImages([...activeImages, 2])
          setTimeout(() => {
            setHeadlineText("Smooth out your day, every day.")
            setActiveImages([...activeImages, 3])
          }, 8000)
        }, 6000)
      }, 300)
    }
  }, [activeImages])

  const handleExploreClicked = () => {}

  return (
    <Layout location={props.location}>
      <Container>
        <ImagesWrapper>
          <StaticImage
            src="../images/tea.jpg"
            className={`headline-image headline-image-active`}
            alt="background"
            quality={90}
            placeholder="blurred"
          />

          <StaticImage
            src="../images/healthyDrinks.jpeg"
            className={`headline-image ${
              activeImages.includes(2) && "headline-image-active"
            }`}
            alt="background"
            quality={90}
            placeholder="blurred"
          />
          <StaticImage
            src="../images/coffee.jpg"
            className={`headline-image ${
              activeImages.includes(3) && "headline-image-active"
            }`}
            alt="background"
            quality={90}
            placeholder="blurred"
          />
        </ImagesWrapper>
        <InfoContainer
          headlineText={headlineText}
          handleExploreClicked={handleExploreClicked}
        />
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
