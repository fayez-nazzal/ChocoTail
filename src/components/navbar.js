import React, { useEffect, useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import SideButtonIcon from "../images/menu.svg"
import { getScrollPercent } from "../helpers/helpers"

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
`

const ColorBackground = styled.div`
  position: absolute;
  height: 50px;
  width: 100%;
  background-color: rgba(175, 142, 105, 0.98);
  top: ${props => (props.homePage ? `${-50 * (1 - props.offset / 100)}px` : 0)};
  left: 0;
`

const Nav = styled.nav`
  position: ${props => (props.homePage ? "absolute" : "sticky")};
  height: 50px;
  display: flex;
  padding-right: 8px;
  justify-content: flex-end;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  transition: background-color ease-in 0.15s;
  user-select: none;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  color: black;
  margin: ${props => (props.main ? "auto auto auto 8px" : "auto 16px")};
  font-size: 25px;

  @media only screen and (max-width: 600px) {
    display: ${props => (props.smShow ? "inline-block" : "none")};
  }
`

const SideButton = styled(SideButtonIcon)`
  margin: auto 2px;
  width: 36px;
  height: 36px;
  fill: ${props => (props.overlayOpened ? "white" : "black")};
  transition: fill 0.24s;

  @media only screen and (min-width: 601px) {
    display: none;
  }
`

const Navbar = props => {
  const {
    allDataJson: {
      nodes: [{ navItems }],
    },
  } = useStaticQuery(graphql`
    {
      allDataJson {
        nodes {
          navItems {
            name
            to
          }
        }
      }
    }
  `)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const onScroll = () => {
    setOffset(getScrollPercent())
  }

  return (
    <Container>
      <ColorBackground offset={offset} homePage={props.homePage} />
      <Nav homePage={props.homePage}>
        <StyledLink to="/" main smShow>
          <StaticImage
            src="../images/logo.png"
            loading="eager"
            alt="logo"
            placeholder="none"
            quality={100}
          />
        </StyledLink>
        {navItems.map(item => (
          <StyledLink to={item.to}>{item.name}</StyledLink>
        ))}
        <SideButton
          role="button"
          overlayOpened={props.overlayOpened}
          onClick={props.handleSideButtonClick}
        />
      </Nav>
    </Container>
  )
}

export default Navbar
