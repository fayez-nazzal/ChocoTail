import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"

const Head = ({ title }) => {
  const {
    site: {
      siteMetadata: { title: websiteTitle },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`${title} | ${websiteTitle}`}</title>
    </Helmet>
  )
}

export default Head
