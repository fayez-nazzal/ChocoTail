import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled, { keyframes } from "styled-components"
import { bounceIn } from "react-animations"

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
    <SidebarContainer {...props}>
      <SpacerDiv space={26} />
      {props.opened &&
        navItems.map(item => (
          <LinkContainer key={item.name} samePage={item.to === props.page}>
            <Link className="link" to={item.to}>
              {item.name}
            </Link>
          </LinkContainer>
        ))}
      <SpacerDiv space={50} />
    </SidebarContainer>
  )
}

export default Navbar

const bounceInAnimation = keyframes`${bounceIn}`

const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 1;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  display: ${({ opened }) => (opened ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  background-color: rgba(175, 142, 105, 0.96);
  box-shadow: inset 0 0 180px 24px #212121;
  opacity: ${({ opened }) => (opened ? "1" : "0")};
  transition: opacity 0.26s ease-in;
  user-select: none;
`

const LinkContainer = styled(Link)`
  animation: ${bounceInAnimation} 0.6s;
  margin: 16px auto;
  padding: 8px 16px;
  border-radius: 16px;
  user-select: none;

  .link {
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    color: white;
    font-size: 36px;
  }

  background-color: ${({ samePage }) =>
    samePage ? "rgb(247, 241, 235, 0.4)" : "rgb(117, 87, 63, 0.4)"};

  &:active {
    background-color: rgb(247, 241, 235, 0.6) !important;
  }
`

const SpacerDiv = styled.div`
  padding: ${({ space }) => space}px;
`
