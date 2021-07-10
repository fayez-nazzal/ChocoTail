import React, { useContext, useRef } from "react"
import Sun from "../images/sun.svg"
import Moon from "../images/moon.svg"
import { ThemeContext } from "../contexts/themeContext"
import styled from "styled-components"

const ThemeToggler = () => {
  const [isDark, setIsDark] = useContext(ThemeContext)
  const timeout = useRef(null)

  const onClick = () => {
    if (!timeout.current)
      timeout.current = setTimeout(() => {
        timeout.current = null
        setIsDark(prev => !prev)
      }, 20)
  }

  return (
    <IconButton onClick={onClick}>
      {isDark ? <Moon className="moon" /> : <Sun className="sun" />}
    </IconButton>
  )
}

export default ThemeToggler

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  margin: 0 4px;
  padding: 6px;
  width: 42px;
  height: 42px;
  border-radius: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgb(0, 0, 0, 0.3);
  }

  &:active {
    background-color: rgb(0, 0, 0, 0.6);
  }

  svg {
    stroke-width: 2px;
    color: #000;
    width: 42px;
    height: 42px;
  }

  .sun {
    fill: #ffe562;
  }

  .moon {
    fill: #ffc000;
  }
`
