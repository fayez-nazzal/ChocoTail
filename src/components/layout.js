import React, { useState, useEffect } from "react"
import { createGlobalStyle } from "styled-components"
import PropTypes from "prop-types"
import Footer from "./footer"
import Navbar from "./navbar"
import OverlayNav from "./overlayNav"
import "fontsource-nunito"
import "fontsource-nunito/400.css"
import "fontsource-nunito/300.css"
import disableScroll from "disable-scroll"

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Nunito', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: ${props => (props.scrollDisabled ? "hidden" : "auto")};
  }
`

const Layout = props => {
  const [overlayOpened, setOverlayOpened] = useState(false)

  useEffect(() => {
    disableScroll.off()
  }, [])

  const toggleOverlay = () => {
    !overlayOpened && disableScroll.on()
    overlayOpened && disableScroll.off()
    setOverlayOpened(!overlayOpened)
  }

  return (
    <>
      <GlobalStyle scrollDisabled={overlayOpened} />
      <Navbar
        homePageScrolled={props.homePageScrolled}
        homePage={props.location.pathname === "/"}
        handleSideButtonClick={toggleOverlay}
        overlayOpened={overlayOpened}
      />
      <OverlayNav page={props.location.pathname} opened={overlayOpened} />
      <main>{props.children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  homePageScrolled: PropTypes.bool,
}

export default Layout
