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
const rippleOut = keyframes`
  100% {
    top: -12px;
    right: -12px;
    bottom: -12px;
    left: -12px;
    opacity: 0;
  }
`

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
  ${({ getsUp }) =>
    getsUp &&
    css`
      position: absolute;
      bottom: 0;
      left: 0;
    `};
  transition: bottom 0.3s;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "inherit"};
    ${({ getsUp }) =>
      getsUp &&
      css`
        bottom: 2px;
      `};
  }

  &:active {
    background-color: ${({ pressedColor }) => pressedColor || "inherit"};
    ${({ animateClick }) =>
      animateClick &&
      css`
        display: inline-block;
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        position: relative;
        animation-name: ${rippleOut};
      `}
  }

  &:active:before {
    ${({ animateClick }) =>
      animateClick &&
      css`
        content: "";
        position: absolute;
        border: #e1e1e1 solid 6px;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        -webkit-animation-duration: 1s;
        animation-duration: 0.2s;
        animation-name: ${rippleOut};
      `}
  }

  ${({ bounceIn }) =>
    bounceIn &&
    css`
      animation: 0.4s ${bounceInAnimation};
    `}
`
