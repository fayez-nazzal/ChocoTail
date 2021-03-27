import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Flex from "./Flex"
import SocialButton from "./SocialButton"

const Footer = props => {
  return (
    <StyledFooter direction={props.direction}>
      {/* dark theme toggle */}
      {/*social buttons */}
      <Flex margin="4px auto 0 16px">
        <span>
          Follow <GreySpan>@fayez-nazzal</GreySpan>
        </span>
        <VerticalLine />
        <SocialButton type="github" />
        <SocialButton type="twitter" />
        <SocialButton type="facebook" />
        <SocialButton type="instagram" />
      </Flex>
      <Flex margin="auto 0">
        <StyledLink to="/license" margin="0 0 0 24px">
          License
        </StyledLink>
        <StyledLink to="/sitemap" margin="0 8px 0 16px">
          Sitemap
        </StyledLink>
      </Flex>
    </StyledFooter>
  )
}

export default Footer

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
  background-color: #937755;
  max-width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  height: ${({ direction }) => (direction === "column" ? 80 : 48)}px;
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  justify-content: flex-end;
  align-items: center;
  user-select: none;
  overflow: visible;
`

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 20px;
  margin: ${({ margin }) => margin};
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: #dbdbdb;
  }
`

const VerticalLine = styled.span`
  border-right: 3.6px solid #efeeec;
  height: 36px;
  margin: 0 4px;
`

const GreySpan = styled.span`
  color: #edefea;
  margin-left: 2px;
  letter-spacing: 2px;
`
