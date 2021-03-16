import React, { useState, useEffect } from "react"
import { createGlobalStyle } from "styled-components"
import Footer from "./Footer"
import Navbar from "./Navbar"
import OverlayNav from "./OverlayNav"
import "fontsource-nunito"
import "fontsource-nunito/400.css"
import "fontsource-nunito/300.css"
import disableScroll from "disable-scroll"
import { Helmet } from "react-helmet"

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>ChocoTail</title>
      </Helmet>
      <Navbar
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

export default Layout

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
