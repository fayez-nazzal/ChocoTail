import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled, { keyframes } from "styled-components"
import { bounceIn } from "react-animations"

const bounceInAnimation = keyframes`${bounceIn}`

const Nav = styled.nav`
  position: fixed;
  z-index: 1;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  display: ${props => (props.opened ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  background-color: rgba(175, 142, 105, 0.96);
  box-shadow: inset 0 0 180px 24px #212121;
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
    props.samePage ? "rgb(247, 241, 235, 0.4)" : "rgb(117, 87, 63, 0.4)"};

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

export default Navbar
