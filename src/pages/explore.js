import React, { useState, useRef, useEffect, useCallback } from "react"
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

const Explore = props => {
  const {
    allDataJson: {
      nodes: [{ excludeOptions, calorieOptions, sortOptions }],
    },
  } = props.data

  const tagsRef = useRef(null)
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
        <CustomDiv gridArea="se" backgroundColor="#dbdbdb88" padding="8px">
          <SearchInputContainer
            onSubmit={handleSubmit}
            animateSearch={animateSearch}
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
          <Flex>
            <StyledButton
              margin="0 4px 8px 8px"
              padding="12px"
              color="#af8e69"
              hoverColor="#7b4c2a"
              onMouseEnter={() => keepScrolling(-1.6)}
              onMouseLeave={stopScrolling}
              onTouchStart={() => keepScrolling(-2, true)}
              onTouchEnd={stopScrolling}
            >
              {"<"}
            </StyledButton>
            <TagsFlex ref={tagsRef} onTagClicked={onTagClicked} />
            <StyledButton
              margin="0 8px 8px 4px"
              padding="12px"
              color="#af8e69"
              hoverColor="#7b4c2a"
              onMouseEnter={() => keepScrolling(1.6)}
              onMouseLeave={stopScrolling}
              onTouchStart={() => keepScrolling(2, true)}
              onTouchEnd={stopScrolling}
            >
              {">"}
            </StyledButton>
          </Flex>
        </CustomDiv>
        <CustomDiv
          gridArea="f"
          backgroundColor="#dbdbdb88"
          padding="8px"
          fontSize="18px"
        >
          <StyledSelect
            {...selectCommonProps}
            innerProps={{ placeholder: "Calories" }}
            options={calorieOptions}
            onChange={kcal => setCalories(kcal.value)}
          />
          <StyledSelect
            {...selectCommonProps}
            innerProps={{ placeholder: "Sort by" }}
            options={sortOptions}
            onChange={sortBy => setSortBy(sortBy.value)}
          />
          <StyledSelect
            {...selectCommonProps}
            innerProps={{ placeholder: "Exclude" }}
            options={excludeOptionsState}
            onInputChange={handleExcludeSelectChange}
            onChange={exc => setExclude(exc.value && exc.value.split(" "))}
          />
        </CustomDiv>
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
  grid-template-rows: minmax(150px, 160px) auto;
  grid-template-areas:
    ". se se se se se se f f f ."
    ". d  d  d  d  d  d  d d d .";

  // extra small screen devices
  @media only screen and (max-width: 600px) {
    grid-template-rows: minmax(150px, 160px) minmax(150px, 160px) auto;

    grid-template-areas:
      ". se se se se se se se se se ."
      ". f  f  f  f  f  f  f  f  f ."
      ". d  d  d  d  d  d  d d d .";
  }
  margin-top: 16px;
  grid-gap: 16px;
`

const SearchInputContainer = styled.form`
  display: flex;

  input,
  .search-icon {
    border: 1px solid #7b4c2a;
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
  }

  input:focus {
    outline: none;
  }

  .search-icon {
    height: 32px;
    fill: ${({ animateSearch }) => (animateSearch ? "black" : "#7b4c2a")};
    background-color: ${({ animateSearch }) =>
      animateSearch ? "rgb(123, 76, 42, 0.1)" : "white"};
    border-right: none;
    border-radius: 8px 0 0 8px;
  }

  .search-icon:hover {
    fill: black;
    background-color: rgb(123, 76, 42, 0.1);
  }
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
    border-color: #7b4c2a !important;
    box-shadow: none !important;
  }

  .filter-select__control--menu-is-open {
    box-shadow: 0 0 0 1px #7b4c2a !important;
  }

  .filter-select__control:hover {
    border-color: #7b4c2a !important;
  }

  .filter-select__option--is-focused,
  .filter-select__option:hover {
    background-color: #cbaa8560;
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
