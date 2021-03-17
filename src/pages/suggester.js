import React, { useState, useEffect, useRef } from "react"
import Layout from "../components/Layout"
import styled, { keyframes } from "styled-components"
import { bounceIn } from "react-animations"
import CustomButton from "../components/CustomButton"
import Drink from "../components/Drink"
import useDrinks from "../hooks/useDrinks"
import sample from "lodash.sample"

const SuggesterPage = props => {
  const [h1Text, setH1Text] = useState("")
  const [pText, setPText] = useState("")
  const [drinkTypeButtonsShown, setDrinksTypeButtonsShown] = useState(false)
  const [drinkHealthButtonsShown, setDrinkHealthButtonsShown] = useState(false)
  const [suggestAnotherButtonShown, setSuggestAnotherButtonShown] = useState(
    false
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [kcalLimits, setKcalLimits] = useState(null)
  const [drinkSample, setDrinkSample] = useState(null)
  const [excludes, setExcludes] = useState([])
  const [drinkShown, setDrinkShown] = useState(false)
  const timeouts = useRef([])

  const drinks = useDrinks(searchQuery, kcalLimits, excludes)

  useEffect(() => {
    const currentTimeouts = timeouts.current

    currentTimeouts.push(
      setTimeout(() => {
        setH1Text("Welcome to the drinks suggester")
        currentTimeouts.push(
          setTimeout(() => {
            setPText("What type of you would like ?")
            currentTimeouts.push(
              setTimeout(() => {
                setDrinksTypeButtonsShown(true)
              }, 600)
            )
          }, 700)
        )
      }, 200)
    )

    return () => {
      for (let timeout of currentTimeouts) clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    searchQuery === "hot" &&
      setExcludes([
        "cold",
        "ice",
        "syrup",
        "juice",
        "slushie",
        "fresca",
        "soda",
        "jelly",
        "blush",
        "fizz",
      ])
    searchQuery === "cold" && setExcludes(["hot", "warm"])
    searchQuery.includes("fruit") &&
      setExcludes(prev => [...prev, "coffee", "cafe", "mocha", "choco"])
  }, [searchQuery])

  useEffect(() => {
    if (drinkShown) {
      setPText("Let me think...")
      setTimeout(() => {
        setH1Text("Here is your drink")
        setPText(null)
        setSuggestAnotherButtonShown(true)
        setDrinkSample(sample(drinks))
      }, 900)
    }
  }, [searchQuery, excludes, drinkShown]) //eslint-disable-line react-hooks/exhaustive-deps

  const onDrinkTypeButtonClicked = query => {
    setSearchQuery(query)

    setDrinksTypeButtonsShown(false)
    setPText("How healthy you want the drink ?")
    timeouts.current.push(
      setTimeout(() => {
        setDrinkHealthButtonsShown(true)
      }, 600)
    )
  }

  const onDrinkHealthButtonClicked = healthOption => {
    setDrinkHealthButtonsShown(false)
    switch (healthOption) {
      case "low kcal":
        setKcalLimits({
          from: 0,
          to: 120,
        })
        break
      case "no caffiene":
        setExcludes(prev => [...prev, "coffee", "cafe", "tea", "caffiene"])
        break
      case "natural":
        setSearchQuery(prev => prev + " fruit")
        break
      default:
    }
    setDrinkShown(true)
  }

  const suggestDrink = () => {
    setTimeout(() => {
      setDrinkSample(sample(drinks))
    }, 200)
  }

  return (
    <Layout location={props.location}>
      <Container>
        <AnimatedText h1 text={h1Text} />
        <AnimatedText text={pText} />
        <ButtonsContainer hidden={!drinkTypeButtonsShown}>
          <CustomizedButton onClick={() => onDrinkTypeButtonClicked("cold")}>
            cold
          </CustomizedButton>
          <CustomizedButton onClick={() => onDrinkTypeButtonClicked("hot")}>
            hot
          </CustomizedButton>
          <CustomizedButton onClick={() => onDrinkTypeButtonClicked("")}>
            {"doesn't matter"}
          </CustomizedButton>
        </ButtonsContainer>
        <ButtonsContainer hidden={!drinkHealthButtonsShown}>
          <CustomizedButton
            onClick={() => onDrinkHealthButtonClicked("low kcal")}
          >
            low kcal
          </CustomizedButton>
          <CustomizedButton
            onClick={() => onDrinkHealthButtonClicked("no caffiene")}
          >
            no caffiene
          </CustomizedButton>
          {searchQuery.includes("cold") && (
            <CustomizedButton
              onClick={() => onDrinkHealthButtonClicked("natural")}
            >
              a sip of nature
            </CustomizedButton>
          )}
          <CustomizedButton onClick={() => onDrinkHealthButtonClicked("")}>
            {"i don't care"}
          </CustomizedButton>
        </ButtonsContainer>
        {drinkSample && (
          <AnimatedDrink key={drinkSample.name} drink={drinkSample} />
        )}
        <ButtonsContainer hidden={!suggestAnotherButtonShown}>
          <CustomizedButton onClick={suggestDrink} animateOnClick>
            Suggest another
          </CustomizedButton>
        </ButtonsContainer>
      </Container>
    </Layout>
  )
}

export default SuggesterPage

const bounceInAnimation = keyframes`${bounceIn}`

const CustomizedButton = ({ onClick, children, animateOnClick }) => (
  <CustomButton
    borderRadius="15px"
    padding="12px 32px"
    fojntSize="20px"
    color="#f5d4a2"
    hoverColor="#7a4c2a"
    margin="16px 4px"
    onClick={onClick}
    animateClick={animateOnClick}
    bounceIn
  >
    {children}
  </CustomButton>
)

const AnimatedText = props => {
  if (!props.text) return null

  const Component = props.h1 ? StyledH1 : StyledP

  return <Component key={props.text}>{props.text}</Component>
}

const StyledH1 = styled.h1`
  animation: ${bounceInAnimation} 0.6s;
`

const ButtonsContainer = styled.div`
  animation: ${bounceInAnimation} 0.3s;
  display: ${({ hidden }) => (hidden ? "none" : "block")};
  justify-content: space-around;

  @media only screen and (max-width: 600px) {
    width: 60%;
    display: ${({ hidden }) => (hidden ? "none" : "flex")};
    margin: 0 auto;
    flex-direction: column;
  }

  @media only screen and (max-width: 400px) {
    width: 80%;
  }
`

const StyledP = styled.p`
  animation: ${bounceInAnimation} 0.3s;
  font-size: 20px;

  @media only screen and (max-width: 400px) {
    font-size: 18px;
  }
`

const AnimatedDrink = ({ drink }) => {
  return (
    <DrinkContainer>
      <Drink eager {...drink} />
    </DrinkContainer>
  )
}

const DrinkContainer = styled.div`
  width: 360px;
  height: 250px;
  margin: 0 auto;
  text-align: center;
  animation: ${bounceInAnimation} 0.6s;

  @media only screen and (max-width: 400px) {
    width: 290px;
    height: 180px;
  }
`

const Container = styled.div`
  text-align: center;
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  padding: 10%;
  box-sizing: border-box;

  @media only screen and (max-width: 600px) {
    padding: 5%;
  }

  @media only screen and (max-width: 380px) and (max-height: 568px) {
    height: 420px;
  }
`
