import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import Head from "../components/Head"
import styled from "styled-components"

const license = ({ location }) => {
  return (
    <Layout location={location}>
      <Head title="License" />
      <Container>
        <StyledH1>
          The{" "}
          <a href="https://github.com/fayez-nazzal/ChocoTail">source code</a> of
          the website is subject to the BSD0 License
        </StyledH1>
        <p>
          Which means that you can use it{" "}
          <YellowSpan>however you want</YellowSpan>.
        </p>
        <StaticImage
          src="../images/emoji.png"
          alt="emoji"
          quality={90}
          className="emoji"
          placeholder="tracedSVG"
          width={180}
          height={180}
        />
      </Container>
    </Layout>
  )
}

export default license

const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  text-align: center;
  padding: 5%;
  box-sizing: border-box;

  p {
    font-size: 22px;
  }
`

const StyledH1 = styled.h1`
  a {
    text-decoration: none;
    color: #b1906c;
  }

  a:hover {
    text-decoration: underline;
  }

  @media only screen and (max-width: 400px) {
    font-size: 26px;
  }
`

const YellowSpan = styled.span`
  color: #e95a46;
`
