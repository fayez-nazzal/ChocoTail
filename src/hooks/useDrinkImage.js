import { useStaticQuery, graphql } from "gatsby"

const useDrinkImage = drinkName => {
  const {
    allFile: { nodes },
  } = useStaticQuery(graphql`
    {
      allFile {
        nodes {
          childrenImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
          name
        }
      }
    }
  `)

  const node = nodes.find(image => image.name.includes(drinkName))

  return node.childrenImageSharp && node.childrenImageSharp[0]
}

export default useDrinkImage
