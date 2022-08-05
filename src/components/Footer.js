import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Flex from "./Flex"
import SocialButton from "./SocialButton"
import useMedia from "../hooks/useMedia"
import ThemeToggler from "./ThemeToggler"
import { maxWidthQueries } from "./Navbar"

const Footer = props => {
  const viewportMedia = useMedia()

  return (
    <StyledFooter direction={props.direction}>
      <FooterContent>
        <Flex margin="4px auto 0 16px" justifyContent="flex-start">
          <span>
            {viewportMedia && viewportMedia.md && "Follow"}
            <GreySpan>@fayez-nazzal</GreySpan>
          </span>
          <VerticalLine />
          <SocialButton type="github" />
          <SocialButton type="twitter" />
          <SocialButton type="facebook" />
          <SocialButton type="instagram" />
        </Flex>
        <Flex margin="auto 0" justifyContent="center">
          <StyledLink
            to="/license"
            margin={viewportMedia && viewportMedia.md ? "0 0 0 24px" : "0 8px"}
          >
            License
          </StyledLink>
          <StyledLink
            to="/sitemap"
            margin={
              viewportMedia && viewportMedia.md ? "0 8px 0 16px" : "0 8px"
            }
          >
            Sitemap
          </StyledLink>
          <ThemeToggler />
        </Flex>
      </FooterContent>
    </StyledFooter>
  )
}

export default Footer

const StyledFooter = styled.footer`
  margin-bottom: 0px;
  background-color: #937755;
  max-width: 100%;
  margin-top: 16px;
  padding-right: 8px;
  height: ${({ direction }) => (direction === "column" ? 11 : 7)}vh;
  user-select: none;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FooterContent = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  justify-content: center;
  align-items: stretch;
  flex: 1;

  ${maxWidthQueries}
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
