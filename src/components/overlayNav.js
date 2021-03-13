import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"
import { bounceIn } from "react-animations"

const bounceInAnimation = keyframes`${bounceIn}`

const Nav = styled.nav`
  position: fixed;
  z-index: 1;
  height: 100%;
  top: 50px;
  left: 0;
  right: 0;
  display: ${props => (props.opened ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  background-image: linear-gradient(to top, #332a23 0%, #75573f 100%);
  opacity: ${props => (props.opened ? "1" : "0")};
  transition: opacity 0.26s ease-in;
  user-select: none;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  color: white;
  margin: 16px auto;
  padding: 8px 16px;
  background-color: ${props =>
    props.samePage ? "rgb(247, 241, 235, 0.6)" : "rgb(175, 142, 105, 0.4)"};

  &:active {
    background-color: rgb(247, 241, 235, 0.6) !important;
  }

  border-radius: 16px;
  font-size: 36px;
  user-select: none;
  animation: ${bounceInAnimation} 0.6s;
`

const SpacerDiv = styled.div`
  padding: 68px;
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
    <Nav {...props}>
      {props.opened &&
        navItems.map(item => (
          <StyledLink to={item.to} samePage={item.to === props.page}>
            {item.name}
          </StyledLink>
        ))}
      <SpacerDiv />
    </Nav>
  )
}

Navbar.propTypes = {
  homePageScrolled: PropTypes.bool,
}

export default Navbar
