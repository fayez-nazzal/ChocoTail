import React from "react"
import styled from "styled-components"
import Layout from "../components/Layout"
import Head from "../components/Head"

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
      <Head title="404 Not found" />
      <Container>
        <h1>Error 404, page not found</h1>
        <p>Try some coffee instead {"\u2615"}</p>
      </Container>
    </Layout>
  )
}

export default Page404
