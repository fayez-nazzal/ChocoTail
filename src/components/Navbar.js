import React, { useEffect, useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import SideButtonIcon from "../images/menu.svg"
import { getScrollPercent } from "../helpers/helpers"

const navbarHeight = 60

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
      <NavBgColor offset={offset} homePage={props.homePage} />
      <Nav homePage={props.homePage}>
        <LinkContainer logo>
          <Link className="link" to="/">
            <StaticImage
              src="../images/logo.png"
              loading="eager"
              alt="logo"
              placeholder="none"
              quality={100}
            />
          </Link>
        </LinkContainer>
        {navItems.map(item => (
          <LinkContainer key={item.name}>
            <Link className="link" to={item.to}>
              {item.name}
            </Link>
          </LinkContainer>
        ))}
        <SideButtonContainer
          onClick={props.handleSideButtonClick}
          overlayOpened={props.overlayOpened}
        >
          <SideButtonIcon className="side-button" role="button" />
        </SideButtonContainer>
      </Nav>
    </Container>
  )
}

export default Navbar

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
`

const NavBgColor = styled.div`
  position: absolute;
  height: ${navbarHeight}px;
  width: 100%;
  background-color: rgba(175, 142, 105, 0.98);
  top: ${({ homePage, offset }) =>
    homePage ? `${-navbarHeight * (1 - offset / 100)}px` : 0};
  left: 0;
`

export const maxWidthQueries = `
@media (min-width: 768px) {
  max-width: 600px;
}

@media (min-width: 1024px) {
  max-width: 800px;
}

@media (min-width: 1280px) {
  max-width: 1000px;
}

@media (min-width: 1600px) {
  max-width: 1360px;
}

@media (min-width: 1920px) {
  max-width: 1700px;
}
`

const Nav = styled.nav`
  position: ${({ homePage }) => (homePage ? "absolute" : "sticky")};
  height: ${navbarHeight}px;
  display: flex;
  padding-right: 8px;
  justify-content: flex-end;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  transition: background-color ease-in 0.15s;
  user-select: none;
  margin: 0 auto;
  max-width: 100%;

  ${maxWidthQueries}
`

const LinkContainer = styled.div`
  margin: ${({ logo }) => (logo ? "auto auto auto 8px" : "auto 16px")};

  .link {
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    color: black;
    font-size: 25px;
  }

  @media only screen and (max-width: 600px) {
    display: ${({ logo }) => (logo ? "inline-block" : "none")};
  }
`

const SideButtonContainer = styled.div`
  margin: auto 2px;

  .side-button {
    fill: ${({ overlayOpened }) => (overlayOpened ? "white" : "#333333")};
    transition: fill 0.24s;
    width: 36px;
    height: 36px;
  }

  .side-button:hover {
    cursor: pointer;
    filter: brightness(1.5);
  }

  @media only screen and (min-width: 601px) {
    display: none;
  }
`
