import React, { useContext } from "react"
import styled, { keyframes } from "styled-components"
import { fadeIn, bounceIn } from "react-animations"
import { Link } from "gatsby"
import { ThemeContext } from "../contexts/themeContext"

const InfoContainer = props => {
  const [isDark] = useContext(ThemeContext)
  if (!props.headlineText) return null

  return (
    <Container isDark={isDark}>
      <StyledH1>{props.headlineText}</StyledH1>
      <StyledP>Explore a vast list of refreshing drinks</StyledP>
      <ButtonContainer>
        <StyledLink to="explore">Explore now</StyledLink>
      </ButtonContainer>
    </Container>
  )
}

export default InfoContainer

const scaleXAnimation = keyframes`
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  80% {
    transform: scaleX(0);
    opacity: 0;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
`
const fadeInAnimation = keyframes`${fadeIn}`
const bounceInAnimation = keyframes`${bounceIn}`

const Container = styled.div`
  position: absolute;
  top: 80px;
  left: 32px;
  background-color: ${props =>
    props.isDark ? "#20202095" : "rgba(230, 230, 230, 0.6)"};
  padding: 8px 32px;
  border-radius: 28px;
  animation: ${scaleXAnimation} 1.4s;

  // for HIDPI desktops & laptops and up
  @media only screen and (min-width: 1920px) {
    left: 60px;
  }

  // for devices like Galaxy Note 5
  @media only screen and (min-width: 400px) and (max-width: 600px) {
    width: 80vw;
    max-width: 80vw;
  }

  // extra small screen devices
  @media only screen and (max-width: 400px) {
    width: 70vw;
    max-width: 70vw;
  }

  // most mobile devices
  @media only screen and (max-width: 600px) {
    left: 0;
    right: 0;
    margin: 0 auto;
  }
`

const StyledP = styled.p`
  margin: 0;
  font-size: 24px;
  animation: ${fadeInAnimation} 0.6s;
  animation-delay: 1s;
  animation-fill-mode: both;

  // for HIDPI desktops & laptops and up
  @media only screen and (min-width: 1920px) {
    font-size: 36px;
  }

  // for devices like Galaxy Note 5
  @media only screen and (min-width: 400px) and (max-width: 600px) {
    font-size: 28px;
  }

  // extra small screen devices
  @media only screen and (max-width: 400px) {
    font-size: 24px;
  }
`

const StyledH1 = styled.h1`
  margin: 16px 0;
  font-size: 48px;
  width: 480px;

  // for HIDPI desktops & laptops and up
  @media only screen and (min-width: 1920px) {
    width: 600px;
    font-size: 56px;
  }

  // for devices like Galaxy Note 5
  @media only screen and (min-width: 400px) and (max-width: 600px) {
    max-width: 100%;
    font-size: 34px;
  }

  // extra small screen devices
  @media only screen and (max-width: 400px) {
    max-width: 100%;
    font-size: 28px;
  }
`

const ButtonContainer = styled.div`
  position: relative;
  width: 160px;
  height: 70px;
`

const StyledLink = styled(Link)`
  color: black;
  display: block;
  text-align: center;
  margin: 16px 0 8px 2px;
  padding: 12px;
  text-decoration: none;
  font-size: 20px;
  border-radius: 15px;
  background-color: #7a4c2a;

  &:hover {
    background-color: #f5d4a2;
  }

  &:active {
    animation: 0.4s ${bounceInAnimation};
  }
`
