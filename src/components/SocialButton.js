import React, { useContext } from "react"
import styled from "styled-components"
import GithubIcon from "../images/github.svg"
import TwitterIcon from "../images/twitter.svg"
import FacebookIcon from "../images/facebook.svg"
import InstagramIcon from "../images/instagram.svg"
import { TooltipContext } from "../contexts/tooltipContext"
import ComedianEmoji from "../images/comedian.svg"
import DizzyEmoji from "../images/dizzy.svg"
import LaughingEmoji from "../images/laughing.svg"
import SlushingEmoji from "../images/slushing.svg"
import SquintingEmoji from "../images/squinting.svg"
import sample from "lodash.sample"

const emojis = [
  <ComedianEmoji key="comedian" className="emoji" />,
  <DizzyEmoji key="dizzy" className="emoji" />,
  <LaughingEmoji key="laughing" className="emoji" />,
  <SquintingEmoji key="squinting" className="emoji" />,
  <SlushingEmoji key="slushing" className="emoji" />,
]

const SocialButton = ({ type }) => {
  const [, setTooltipChildren] = useContext(TooltipContext)

  const getSocialIcon = () => {
    switch (type) {
      case "github":
        return <GithubIcon className="github" />
      case "facebook":
        return <FacebookIcon className="facebook" />
      case "twitter":
        return <TwitterIcon className="twitter" />
      case "instagram":
        return <InstagramIcon className="instagram" />
      default:
        return "unavailable"
    }
  }

  const handleClick = () => {
    setTooltipChildren(
      <TooltipSpan>
        fake button
        {sample(emojis)}
      </TooltipSpan>
    )
  }

  return (
    <MiniButton onClick={handleClick} className="tooltip-here">
      {getSocialIcon()}
    </MiniButton>
  )
}

export default SocialButton

const activeButtonCss = `
  background-color: #555555;

  .facebook {
    fill: #036ce4;
  }

  .twitter {
    fill: #1da1f2;
  }

  .github {
    fill: white;
  }

  .instagram {
    fill: #cc2366;
  }
`

const MiniButton = styled.button`
  background-color: transparent;
  border: none;
  margin: 0 4px;
  padding: 2px;
  width: 28px;
  height: 28px;
  border-radius: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      ${activeButtonCss}
    }
  }

  &:active {
    ${activeButtonCss}
  }

  svg {
    fill: #e8e9ea;
    color: #000;
    width: 20px;
  }
`

const TooltipSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  .emoji {
    margin-left: 3px;
    width: 24px;
    height: 24px;
  }
`
