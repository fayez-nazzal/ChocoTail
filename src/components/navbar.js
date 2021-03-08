import * as React from "react"
import CoffeeIcon from "../images/coffeeIcon.svg"
import { Link } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`

const Nav = styled.nav`
  position: ${(props) => props.homePage? "absolute":"sticky"};
  height: 56px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.homePageScrolled || !props.homePage? "rgba(147, 119, 85, 0.98)":"transparent"};
  transition: background-color ease-in 0.15s;
  `

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: ${props => (props.main ? "auto auto auto 8px" : "auto 16px")};
  font-size: 28px;

  @media only screen and (max-width: 768px) {
    display: ${(props) => props.smShow? "inline-block":"none"};
  }
`

const Title = styled.span`
  display: inline-block;
  font-weight: "bolder";
`

const StyledCoffe = styled(CoffeeIcon)`
  height: 32px;
`

const ChocoColor = styled.span`
  color: #915821;
`

const Navbar = (props) => (
  <Container>
    <Nav homePageScrolled={props.homePageScrolled} homePage={props.homePage} >
      <StyledLink to="/" main smShow>
        <StyledCoffe />{" "}
        <Title>
          <ChocoColor>Choco</ChocoColor>Tail
        </Title>
      </StyledLink>
      <StyledLink to="/explore">Explore</StyledLink>
      <StyledLink to="/suggest">Suggest</StyledLink>
      <StyledLink to="/about">About</StyledLink>
    </Nav>
  </Container>
)

Navbar.propTypes = {
  homePageScrolled: PropTypes.bool
}

export default Navbar
