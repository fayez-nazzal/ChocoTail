import React, { useState } from "react"
import styled, { keyframes, css } from "styled-components"
import { bounceIn } from "react-animations"

const bounceInAnimation = keyframes`${bounceIn}`

const StyledButton = styled.button`
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  font-size: ${props => props.fontSize};
  background-color: ${props => props.color};
  border: none;
  border-radius: ${props => props.borderRadius};
  cursor: pointer;
  user-select: none;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${props => props.hoverColor};
  }

  ${props =>
    props.bounceIn
      ? css`
          animation: 0.4s ${bounceInAnimation};
        `
      : ""};
`

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
