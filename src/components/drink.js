import React, { useState } from "react"
import styled, { keyframes } from "styled-components"
import LinkIcon from "../images/link.svg"
import StarFill from "../images/star-fill.svg"
import useDrinkImage from "../hooks/useDrinkImage"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { bounceIn } from "react-animations"

const Drink = props => {
  const [overlayShown, setOverlayShown] = useState(false)
  const drinkImage = useDrinkImage(props.name)
  const image = getImage(drinkImage)

  if (!drinkImage) return null

  const showOverlay = e => {
    setOverlayShown(true)
    e.preventDefault()
  }

  const hideOverlay = e => {
    setOverlayShown(false)
    e.preventDefault()
  }

  return (
    <Container
      {...props}
      onMouseEnter={showOverlay}
      onMouseLeave={hideOverlay}
      onTouchStart={showOverlay}
      onTouchEnd={hideOverlay}
      onTouchCancel={hideOverlay}
    >
      <GatsbyImage image={image} alt={props.name} />
      <AlphaOverlay shown={overlayShown} />
      {overlayShown && <TextDiv lines={props.lines}>{props.summary}</TextDiv>}
      <RatingContainer>
        {parseInt(props.rating ? props.rating : 0)}
        <StarFill className="star" />
      </RatingContainer>
      <Info bigFont={props.bigFont}>
        <h3>{props.name}</h3>
        <span>{props.calories + "kcal"}</span>
        <span>{props.prep}</span>
        <a href={props.url}>
          <LinkIcon />
        </a>
      </Info>
    </Container>
  )
}

export default Drink

const bounceInAnimation = keyframes`${bounceIn}`

const Container = styled.span`
  position: relative;
  display: inline-block;
  width: auto;
  height: auto;
  margin-top: 6px;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%
    max-width: 100%;
    max-height: 100%;
    disblay: block;
    border-radius: 12px;
  }
`

const Info = styled.div`
  position: absolute;
  padding: 4px;
  padding-bottom: 2px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #c0c0c092;
  border-radius: 0 0 12px 12px;
  max-width: 100%;

  & > h3 {
    font-size: ${({ bigFont }) => (bigFont ? "24px" : "18px")};
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.3rem;
    margin: 0;
  }

  & > span {
    font-size: ${({ bigFont }) => (bigFont ? "18px" : "14px")};
    font-weight: 400;
    margin: 0 16px 0 0;
  }

  & > a {
    position: absolute;
    bottom: 0;
    right: 5px;
  }
`

const RatingContainer = styled.div`
  display: flex;
  background-color: #c0c0c092;
  position: absolute;
  border-radius: 12px;
  padding: 4px;
  top: 4px;
  right: 2px;
  font-size: 16px;
  line-height: 16px;

  .star {
    margin-left: 2px;
    fill: #fdcc0d;
    height: 14px;
  }
`

const TextDiv = styled.span`
  position: absolute;
  left: 0;
  top: 25%;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 0 10%;
  box-sizing: border-box;
  font-size: 22px;
  color: white;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ lines }) => lines || 2};
  -webkit-box-orient: vertical;
  animation: ${bounceInAnimation} 0.4s;

  @media only screen and (max-width: 600px) {
    font-size: 18px;
    line-height: 18px;
  }
`

const AlphaOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #433d3c;
  opacity: ${({ shown }) => (shown ? "0.6" : "0")};
  transition: opacity 0.6s;
`
