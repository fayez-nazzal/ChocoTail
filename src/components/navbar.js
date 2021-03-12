import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"

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
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: ${props => (props.main ? "auto auto auto 8px" : "auto 16px")};
  font-size: 25px;

  @media only screen and (max-width: 768px) {
    display: ${props => (props.smShow ? "inline-block" : "none")};
  }
`

const Navbar = props => (
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
      <StyledLink to="/explore">Explore</StyledLink>
      <StyledLink to="/suggest">Suggest</StyledLink>
      <StyledLink to="/about">About</StyledLink>
    </Nav>
  </Container>
)

Navbar.propTypes = {
  homePageScrolled: PropTypes.bool,
}

export default Navbar
