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
import Flex from "../components/Flex"
import TagsFlex from "../components/TagsFlex"
import StyledButton from "../components/CustomButton"
import CustomButton from "../components/CustomButton"
import useMedia from "../hooks/useMedia"
import Head from "../components/Head"
import { ThemeContext } from "../contexts/themeContext"

const Explore = props => {
  const {
    allDataJson: {
      nodes: [{ excludeOptions, calorieOptions, sortOptions }],
    },
  } = props.data

  const tagsRef = useRef(null)
  const [isDark] = useContext(ThemeContext)
  const scrollInterval = useRef(null)
  const searchInputRef = useRef(null)
  const viewportMedia = useMedia()
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [calories, setCalories] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [exclude, setExclude] = useState("")
  const [excludeOptionsState, setExcludeOptionsState] = useState(excludeOptions)

  const caloriesLimits = calories && {
    from: parseInt(calories.split("-")[0]),
    to: parseInt(calories.split("-")[1]),
  }
  const drinks = useDrinks(searchQuery, caloriesLimits, exclude)
  const [animateSearch, setAnimateSearch] = useState(false)

  useEffect(() => {
    scrollX(4)

    return () => {
      stopScrolling()
    }
  }, [])

  const onTagClicked = useCallback(tag => {
    setSearchInput(tag)
    setSearchQuery(tag)
  }, [])

  const scrollX = x => {
    tagsRef.current.scroll({
      left: tagsRef.current.scrollLeft + x,
      behaviour: "smooth",
    })
  }

  const keepScrolling = (x, isTouch) => {
    if (
      viewportMedia &&
      (isTouch || (!viewportMedia.sm && !viewportMedia.xs))
    ) {
      scrollInterval.current = setInterval(() => {
        scrollX(x)
      }, 1)
    }
  }

  const stopScrolling = () => {
    clearInterval(scrollInterval.current)
  }

  const handleExcludeSelectChange = (str, { action }) => {
    if (action === "input-change") {
      const filteredOptions = [...excludeOptions].filter(opt => !opt.recent)
      filteredOptions.push({
        value: str,
        label: str,
        recent: true,
      })
      setExcludeOptionsState(filteredOptions)
    }
  }

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
              <SearchIcon className="search-icon" />
            </CustomButton>
            <input
              ref={searchInputRef}
              onChange={({ target: { value } }) => setSearchInput(value)}
              value={searchInput}
            />
          </SearchInputContainer>
          <CustomDiv margin="20px 16px 8px 8px" fontSize="20px">
            Popular tags
          </CustomDiv>
          <TagsFlex ref={tagsRef} onTagClicked={onTagClicked} />
        </DrinkSearchContainer>
        <FiltersContainer isDark={isDark}>
          <StyledSelect
            {...selectCommonProps}
            isDark={isDark}
            innerProps={{ placeholder: "Calories" }}
            options={calorieOptions}
            onChange={kcal => setCalories(kcal.value)}
          />
          <StyledSelect
            {...selectCommonProps}
            isDark={isDark}
            innerProps={{ placeholder: "Sort by" }}
            options={sortOptions}
            onChange={sortBy => setSortBy(sortBy.value)}
          />
          <StyledSelect
            {...selectCommonProps}
            isDark={isDark}
            innerProps={{ placeholder: "Exclude" }}
            options={excludeOptionsState}
            onInputChange={handleExcludeSelectChange}
            onChange={exc => setExclude(exc.value && exc.value.split(" "))}
          />
        </FiltersContainer>
        <DrinksContainer>
          <DrinksGrid sortBy={sortBy} drinks={drinks} />
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
    ". se se se se se se f f f ."
    ". d  d  d  d  d  d  d d d .";

  // extra small screen devices
  @media only screen and (max-width: 600px) {
    grid-template-areas:
      ". se se se se se se se se se ."
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
    padding: 4px;
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
  padding: 8px;
  border-radius: 8px;
`

const FiltersContainer = styled(DrinkSearchContainer)`
  grid-area: f;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`

const CustomDiv = styled.div`
  margin: ${props => props.margin};
  font-size: ${props => props.fontSize};
  padding: ${props => props.padding};
  background-color: ${props => props.backgroundColor};
  border-radius: 8px;
  grid-area: ${props => props.gridArea};
  color: ${props => props.color};
`

const DrinksContainer = styled.div`
  grid-area: d;
`

const StyledSelect = styled(Select)`
  margin-top: 8px;
  user-select: none;

  .filter-select__control {
    border: 1px solid ${props => (props.isDark ? "#e9e9e9" : "#212121")} !important;
    box-shadow: none !important;
    background-color: ${props => (props.isDark ? "#00000074" : "#ffffff")};
  }

  .filter-select__option {
    background-color: ${props => (props.isDark ? "#00000074" : "#ffffff")};
    border: none;
  }

  .filter-select__menu-list {
    background-color: ${props => (props.isDark ? "#00000074" : "#ffffff")};
  }

  .filter-select__control--menu-is-open {
    box-shadow: 0 0 0 1px #7b4c2a !important;
  }

  .filter-select__control:hover {
    border-color: ${props => (props.isDark ? "#e9e9e9" : "#212121")} !important;
  }

  .filter-select__option--is-focused,
  .filter-select__option:hover {
    background-color: #cbaa8550;
  }

  .filter-select__option--is-selected {
    color: #cbaa85 !important;
  }

  .filter-select__single-value {
    color: ${props => (props.isDark ? "#d1d1d1" : "#000000")} !important;
  }
`

const StyledValueContainer = styled(ValueContainer)`
  &:hover {
    border-color: red;
  }
`

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <>
      <CustomDiv color="grey" fontSize="16px" margin="0 0 0 8px">
        {props.selectProps.innerProps.placeholder}
      </CustomDiv>
      <StyledValueContainer {...props}>
        {React.Children.map(children, child => child)}
      </StyledValueContainer>
    </>
  )
}

const selectCommonProps = {
  components: { ValueContainer: CustomValueContainer },
  placeholder: "",
  classNamePrefix: "filter-select",
}

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
