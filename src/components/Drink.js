import React, { useContext, useState } from "react"
import { navigate } from "gatsby"
import styled, { keyframes } from "styled-components"
import LinkIcon from "../images/link.svg"
import StarFill from "../images/star-fill.svg"
import useDrinkImage from "../hooks/useDrinkImage"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { bounceIn } from "react-animations"
import { ThemeContext } from "../contexts/themeContext"

const Drink = props => {
  const [isDark] = useContext(ThemeContext)
  const [overlayShown, setOverlayShown] = useState(false)
  const drinkImage = useDrinkImage(props.name)

  const image = getImage(drinkImage)

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
      onClick={() => {
        navigate(`/recepie/${props.fields.slug}`)
      }}
    >
      <GatsbyImage
        loading={props.eager ? "eager" : "lazy"}
        image={image}
        alt={props.name}
      />
      <AlphaOverlay shown={overlayShown} />
      {overlayShown && <TextDiv lines={props.lines}>{props.summary}</TextDiv>}
      <RatingContainer>
        {parseInt(props.rating ? props.rating : 0)}
        <StarFill className="star" />
      </RatingContainer>
      <Info bigFont={props.bigFont} isDark={isDark}>
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
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  margin-top: 6px;
  cursor: pointer;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
    max-width: 100%;
    max-height: 100%;
    display: block;
    border-radius: 12px;
  }
`

const Info = styled.div`
  position: absolute;
  padding: 8px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => (props.isDark ? "#12121292" : "#c0c0c092")};
  border-radius: 0 0 12px 12px;
  max-width: 100%;
  cursor: default;

  & > h3 {
    font-size: ${({ bigFont }) => (bigFont ? "24px" : "18px")};
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.3rem;
    line-height: 2.2rem;
    font-weight: 400;
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
  background-color: ${props => (props.isDark ? "#20202092" : "#c0c0c092")};
  position: absolute;
  border-radius: 16px;
  padding: 8px 10px;
  top: 4px;
  right: 4px;
  font-size: 18px;
  line-height: 16px;

  .star {
    margin-left: 4px;
    fill: #fdcc0d;
    height: 16px;
  }
`

const TextDiv = styled.span`
  position: absolute;
  left: 0;
  top: 25%;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 2px 10%;
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
  border-radius: 12px;
`
