import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const StyledFooter = styled.footer`
  background-color: #937755;
  margin-top: 8px;
  padding: 10px 2px;
  display: flex;
  justify-content: flex-end;
  user-select: none;
`

const FooterLink = styled(Link)`
  color: black;
  text-decoration: none;
  margin: 0 10px;
`

const Footer = () => {
  return (
    <StyledFooter>
      {/* dark theme toggle */}
      {/*social buttons */}
      <FooterLink to="/contact">Contact</FooterLink>
      <FooterLink to="/sitemap">Sitemap</FooterLink>
    </StyledFooter>
  )
}

export default Footer
