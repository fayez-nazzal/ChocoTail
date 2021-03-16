import React from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import Layout from "../components/Layout"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  padding: 0 16px;

  p {
    font-size: 22px;
  }
`

const Page404 = props => {
  return (
    <Layout location={props.location}>
      <Helmet>
        <title>ChocoTail | 404 Not found</title>
      </Helmet>
      <Container>
        <h1>Error 404, page not found</h1>
        <p>Try some coffee instead {"\u2615"}</p>
      </Container>
    </Layout>
  )
}

export default Page404
