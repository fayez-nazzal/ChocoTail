/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { createGlobalStyle } from "styled-components"
import PropTypes from "prop-types"
import Footer from "./footer"
import Navbar from "./navbar"
import "fontsource-nunito"
import "fontsource-nunito/400.css"
import "fontsource-nunito/300.css"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    font-family: 'Nunito', sans-serif;
  }
`

const Layout = ({ children, homePageScrolled, homePage }) => {
  return (
    <>
      <GlobalStyle />
      <Navbar homePageScrolled={homePageScrolled} homePage={homePage} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  homePageScrolled: PropTypes.bool,
}

export default Layout
