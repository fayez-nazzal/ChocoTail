import React, { useState, useEffect, useContext } from "react"
import styled, { createGlobalStyle } from "styled-components"
import Footer from "./Footer"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import "fontsource-lato"
import "fontsource-lato/400.css"
import "fontsource-lato/300.css"
import disableScroll from "disable-scroll"
import Tooltip from "./Tooltip"
import useMedia from "../hooks/useMedia"
import { ThemeContext } from "../contexts/themeContext"

const Layout = props => {
  const [overlayOpened, setOverlayOpened] = useState(false)
  const [isDark] = useContext(ThemeContext)
  const viewportMedia = useMedia()
  const footerDir =
    viewportMedia && (viewportMedia.xs || viewportMedia.sm) ? "column" : "row"

  useEffect(() => {
    disableScroll.off()
  }, [])

  const toggleOverlay = () => {
    !overlayOpened && disableScroll.on()
    overlayOpened && disableScroll.off()
    setOverlayOpened(!overlayOpened)
  }

  return (
    <Container>
      <GlobalStyle
        isDark={isDark}
        footerDir={footerDir}
        scrollDisabled={overlayOpened}
      />
      <Navbar
        homePage={props.location && props.location.pathname === "/"}
        handleSideButtonClick={toggleOverlay}
        overlayOpened={overlayOpened}
      />
      <Sidebar
        page={props.location && props.location.pathname}
        opened={overlayOpened}
      />
      <main>{props.children}</main>
      <Footer direction={footerDir} />
      <Tooltip />
    </Container>
  )
}

export default Layout

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Lato', sans-serif !important;
  }

  hrml: {
    min-height: 100%;
    min-height: 100vh;
  }

  body {
    margin: 0;
    padding: 0;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: ${props => (props.scrollDisabled ? "hidden" : "auto")};
    background-color: ${props =>
      props.isDark ? "#0d0d09" : "rgb(251, 251, 251)"};

      color: ${props => (props.isDark ? "white" : "rgb(5, 5, 5)")};
  }
`

const Container = styled.div`
  position: relative;
  min-height: 100%;
`
