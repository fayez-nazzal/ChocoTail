import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Flex from "./Flex"
import sample from "lodash.sample"
import CustomButton from "./CustomButton"

const TagsFlex = (props, ref) => {
  const {
    allDataJson: {
      nodes: [{ tags }],
    },
  } = useStaticQuery(graphql`
    {
      allDataJson {
        nodes {
          tags
        }
      }
    }
  `)

  return (
    <Flex ref={ref} justifyContent="center" wraps>
      {tags.map(tag => (
        <CustomButton
          key={tag}
          onClick={() => props.onTagClicked(tag)}
          padding="6px"
          fontSize="18px"
          margin="0 4px 8px 4px"
          borderRadius="0"
          color={randomColor()}
          hoverColor="#AC8B67"
          animateOnClick
        >
          {tag}
        </CustomButton>
      ))}
    </Flex>
  )
}

export default React.memo(React.forwardRef(TagsFlex))

const randomColor = () => {
  return sample([
    "#2a9d8f",
    "#e9c46a",
    "#f4a261",
    "#e76f51",
    "#0077b6",
    "#90e0ef",
    "#99d98c",
    "#ff006e",
    "#fb5607",
    "#ffbe0b",
    "#8338ec",
  ])
}
