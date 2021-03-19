import React, { useEffect, useState, useContext } from "react"
import styled, { keyframes } from "styled-components"
import { bounceIn } from "react-animations"
import { TooltipContext } from "../contexts/tooltipContext"

const Tooltip = () => {
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [isShown, setIsShown] = useState(false)
  const [children] = useContext(TooltipContext)

  useEffect(() => {
    let shownTimeout

    const handleMouseClick = e => {
      const elementsAtPosition = document.elementsFromPoint(
        e.clientX,
        e.clientY
      )

      for (let element of elementsAtPosition) {
        if (element.classList.contains("tooltip-here")) {
          const elementRect = element.getBoundingClientRect()
          setLeft(elementRect.left)
          setTop(elementRect.top - elementRect.height - 10 + window.scrollY)
          setIsShown(true)
          clearTimeout(shownTimeout)
          shownTimeout = setTimeout(() => {
            setIsShown(false)
          }, 800)
          return
        }
      }
      setIsShown(false)
    }

    document.addEventListener("click", handleMouseClick)

    return () => {
      document.removeEventListener("click", handleMouseClick)
      clearTimeout(shownTimeout)
    }
  }, [])

  return (
    <Container hidden={!isShown} key={top + left} left={left} top={top}>
      <Span>{children}</Span>
    </Container>
  )
}

export default Tooltip

const bounceInAnimation = keyframes`${bounceIn}`

const Container = styled.span`
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  width: 140px;
  height: 30px;
  animation: ${bounceInAnimation} 0.4s;
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  align-items: center;
`
const Span = styled.span`
  width: 120px;
  background-color: #545454;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 8px;
  position: relative;
  z-index: 1;
  bottom: 0;
  left: 0;
  margin-left: -56px;

  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #545454 transparent transparent transparent;
  }
`
