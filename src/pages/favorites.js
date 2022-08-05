import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react"
import styled from "styled-components"
import Layout from "../components/Layout"
import useDrinks from "../hooks/useDrinks"
import { graphql } from "gatsby"
import SearchIcon from "../images/search.svg"
import DrinksGrid from "../components/ExploreDrinksGrid"
import Select, { components } from "react-select"
import TagsFlex from "../components/TagsFlex"
import CustomButton from "../components/CustomButton"
import useMedia from "../hooks/useMedia"
import Head from "../components/Head"
import { ThemeContext } from "../contexts/themeContext"
import useFavoriteDrinks from "../hooks/useFavoriteDrinks"
import { FavoritesContext } from "../contexts/favoritesContext"

const Explore = props => {
  const {
    allDataJson: {
      nodes: [{ excludeOptions, calorieOptions, sortOptions }],
    },
  } = props.data

  const [isDark] = useContext(ThemeContext)
  const searchInputRef = useRef(null)
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const { favoriteDrinks: drinks } = useContext(FavoritesContext)
  const [animateSearch, setAnimateSearch] = useState(false)

  const handleSubmit = () => {
    setSearchQuery(searchInput)
    setAnimateSearch(true)

    setTimeout(() => {
      setAnimateSearch(false)
    }, 180)

    if (searchInputRef.current) searchInputRef.current.blur()
  }

  return (
    <Layout location={props.location}>
      <Head title="Explore"></Head>
      <Container>
        <DrinkSearchContainer isDark={isDark}>
          <SearchInputContainer
            onSubmit={handleSubmit}
            animateSearch={animateSearch}
            isDark={isDark}
          >
            <CustomButton
              type="submit"
              onClick={handleSubmit}
              margin="0"
              padding="0"
            >
              <SearchIcon shapeRendering="crispEdges" className="search-icon" />
            </CustomButton>
            <input
              ref={searchInputRef}
              onChange={({ target: { value } }) => setSearchInput(value)}
              value={searchInput}
            />
          </SearchInputContainer>
        </DrinkSearchContainer>
        <DrinksContainer>
          <DrinksGrid sortBy={"name"} drinks={drinks} />
        </DrinksContainer>
      </Container>
    </Layout>
  )
}

export default Explore

const { ValueContainer } = components

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: minmax(min-content, max-content) auto;
  grid-template-areas:
    ". . se se se se se se se . ."
    ". d  d  d  d  d  d  d d d .";

  // extra small screen devices
  @media only screen and (max-width: 600px) {
    grid-template-areas:
      ". . se se se se se se se . ."
      ". f  f  f  f  f  f  f  f  f ."
      ". d  d  d  d  d  d  d d d .";
  }
  margin-top: 1.6rem;
  margin-bottom: 2rem;
  grid-gap: 1.2rem;
`

const SearchInputContainer = styled.form`
  display: flex;

  input,
  .search-icon {
    border: 1px solid ${props => (props.isDark ? "#e9e9e9" : "#212121")};
    padding: 8px;
  }

  input {
    height: 32px;
    width: 100%;
    font-size: 24px;
    margin: 0;
    border-left: none;
    border-radius: 0 8px 8px 0 !important;
    font-weight: 300;
    background-color: ${props => (props.isDark ? "#00000074" : "#ffffff")};
    color: ${props => (props.isDark ? "#ffffff" : "#000000")};
  }

  input:focus {
    outline: none;
  }

  .search-icon {
    height: 32px;
    fill: ${({ animateSearch, isDark }) =>
      animateSearch || !isDark ? "black" : "#e9e9e9"};
    background-color: ${props => (props.isDark ? "#00000074" : "#ffffff")};
    border-right: none;
    border-radius: 8px 0 0 8px;
  }

  .search-icon:hover {
    fill: black;
    background-color: rgb(123, 76, 42, 0.1);
  }
`

const DrinkSearchContainer = styled.div`
  grid-area: se;
  background-color: ${props => (props.isDark ? "#82828290" : "#dbdbdb88")};
  padding: 16px;
  border-radius: 8px;
`

const DrinksContainer = styled.div`
  grid-area: d;
`

export const query = graphql`
  {
    allDataJson {
      nodes {
        excludeOptions {
          label
          value
        }
        calorieOptions {
          label
          value
        }
        sortOptions {
          label
          value
        }
      }
    }
  }
`
