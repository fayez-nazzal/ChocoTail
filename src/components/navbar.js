import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"
import SideButtonIcon from "../images/menu.svg"

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
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
  background-color: ${props =>
    props.homePageScrolled || !props.homePage
      ? "rgba(175,142,105,0.98)"
      : "transparent"};
  transition: background-color ease-in 0.15s;
  user-select: none;

  @media only screen and (max-width: 600px) {
    background-color: rgb(175, 142, 105);
  }
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

  return (
    <Container>
      <Nav homePageScrolled={props.homePageScrolled} homePage={props.homePage}>
        <StyledLink to="/" main smShow>
          <StaticImage
            src="../images/logo.png"
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

Navbar.propTypes = {
  homePageScrolled: PropTypes.bool,
}

export default Navbar
