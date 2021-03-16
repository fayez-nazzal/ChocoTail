import React, { useState } from "react"
import styled, { keyframes, css } from "styled-components"
import { bounceIn } from "react-animations"

const CustomButton = props => {
  const [animate, setAnimate] = useState(false)

  const handleClick = e => {
    if (props.animateOnClick) {
      setAnimate(true)
      setTimeout(() => {
        setAnimate(false)
      }, 800)
    }
    props.onClick && props.onClick()
    e.preventDefault()
  }

  return (
    <StyledButton {...props} onClick={handleClick} bounceIn={animate}>
      {props.children}
    </StyledButton>
  )
}

export default CustomButton

const bounceInAnimation = keyframes`${bounceIn}`

const StyledButton = styled.button`
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  font-size: ${({ fontSize }) => fontSize || "18px"};
  background-color: ${({ color }) => color || "transparent"};
  border: none;
  border-radius: ${({ borderRadius }) => borderRadius || "none"};
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "inherit"};
  }

  ${({ bounceIn }) =>
    bounceIn
      ? css`
          animation: 0.4s ${bounceInAnimation};
        `
      : ""};
`
