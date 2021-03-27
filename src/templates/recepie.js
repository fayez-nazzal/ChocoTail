import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import styled from "styled-components"
import useDrinkImage from "../hooks/useDrinkImage"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Recepie = props => {
  const { name, ingredients, directions } = props.data.drinkDataJson
  const drinkImage = useDrinkImage(name)
  const image = getImage(drinkImage)

  return (
    <Layout>
      <Container>
        <ImageContainer>
          <GatsbyImage loading="lazy" image={image} alt={props.name} />
        </ImageContainer>
        <TitleContainer>
          <h1>{name}</h1>
        </TitleContainer>
        <IngredientsContainer>
          <h2>Ingredients</h2>
          <p>
            <ol>
              {ingredients &&
                ingredients
                  .split(",")
                  .map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
            </ol>
          </p>
        </IngredientsContainer>
        <DirectionsContainer>
          <h2>Directions</h2>
          <p>
            <ol>
              {directions
                .split(/^\d+\.+\s+|\s\d\.\s/)
                .map(
                  (d, index) => d.trim().length > 0 && <li key={index}>{d}</li>
                )}
            </ol>
          </p>
        </DirectionsContainer>
      </Container>
    </Layout>
  )
}

export default Recepie

export const query = graphql`
  query($slug: String) {
    drinkDataJson(fields: { slug: { eq: $slug } }) {
      name
      ingredients
      directions
    }
  }
`

const Container = styled.div`
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  display: grid;
  width: 100vw;
  max-width: 100vw;
  grid-template-columns: 20px repeat(11, 1fr);
  grid-template-rows: 60px 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "t t t t t t t t t t t t"
    ". i i i i i m m m m m ."
    ". i i i i i m m m m m ."
    ". d d d d d d d d d d d"
    ". d d d d d d d d d d d";
`

const TitleContainer = styled.div`
  grid-area: t;
`

const IngredientsContainer = styled.div`
  grid-area: i;
`

const DirectionsContainer = styled.div`
  grid-area: d;
`

const ImageContainer = styled.div`
  grid-area: m;
  .gatsby-image-wrapper {
    border-radius: 20px;
    width: 100%;
    height: 100%;
  }
`
