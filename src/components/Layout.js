import React, { useState, useEffect } from "react"
import { createGlobalStyle } from "styled-components"
import Footer from "./Footer"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import "fontsource-lato"
import "fontsource-lato/400.css"
import "fontsource-lato/300.css"
import disableScroll from "disable-scroll"
import Tooltip from "./Tooltip"

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
        homePage={props.location.pathname === "/"}
        handleSideButtonClick={toggleOverlay}
        overlayOpened={overlayOpened}
      />
      <Sidebar page={props.location.pathname} opened={overlayOpened} />
      <main>{props.children}</main>
      <Footer />
      <Tooltip />
    </>
  )
}

export default Layout

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Lato', sans-serif !important;
  }

  body {
    margin: 0;
    padding: 0;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: ${props => (props.scrollDisabled ? "hidden" : "auto")};
  }
`
