import React, { useState, useRef, useEffect, useCallback } from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import SearchIcon from "../images/search.svg"
import DrinksGrid from "../components/drinksGrid"
import Select, { components } from "react-select"
import Flex from "../components/flex"
import TagsFlex from "../components/tagsFlex"
import StyledButton from "../components/customButton"

const { ValueContainer } = components

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: minmax(150px, 160px) auto;
  grid-template-areas:
    ". se se se se se se f f f ."
    ". d  d  d  d  d  d  d d d .";
  margin-top: 16px;
  grid-gap: 16px;
`

const SearchInputContainer = styled.div`
  display: flex;

  input,
  .search-icon {
    border: 1px solid #7b4c2a;
    padding: 4px;
  }

  input {
    height: 32px;
    width: 100%;
    font-size: 20px;
    margin: 0;
    border-left: none;
    border-radius: 0 8px 8px 0 !important;
  }

  input:focus {
    outline: none;
  }

  .search-icon {
    height: 32px;
    fill: #7b4c2a;
    background-color: white;
    border-right: none;
    border-radius: 8px 0 0 8px;
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
  console.log(props)
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

const Explore = ({
  data: {
    allDataJson: {
      nodes: [{ excludeOptions, calorieOptions, sortOptions }],
    },
  },
}) => {
  const tagsRef = useRef(null)
  const scrollInterval = useRef(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [calories, setCalories] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [exclude, setExclude] = useState("")
  const [excludeOptionsState, setExcludeOptionsState] = useState({})
  const onTagClicked = useCallback(tag => {
    setSearchQuery(tag)
  }, [])

  useEffect(() => {
    scrollX(4)
    setExcludeOptionsState(excludeOptions)
    return () => {
      stopScrolling()
    }
  }, [])

  const scrollX = x => {
    tagsRef.current.scroll({
      left: tagsRef.current.scrollLeft + x,
      behaviour: "smooth",
    })
  }
  const keepScrolling = x => {
    scrollInterval.current = setInterval(() => {
      scrollX(x)
    }, 1)
  }

  const stopScrolling = () => {
    clearInterval(scrollInterval.current)
  }

  return (
    <Layout>
      <Container>
        <CustomDiv gridArea="se" backgroundColor="#dbdbdb88" padding="8px">
          <SearchInputContainer>
            <SearchIcon className="search-icon" />
            <input
              onChange={({ target: { value } }) => setSearchQuery(value)}
              value={searchQuery}
            />
          </SearchInputContainer>
          <CustomDiv margin="20px 16px 8px 8px" fontSize="20px">
            Popular tags
          </CustomDiv>
          <Flex>
            <StyledButton
              padding="12px"
              margin="0 4px 8px 8px"
              color="#af8e69"
              hoverColor="#7b4c2a"
              onMouseEnter={() => keepScrolling(-1.6)}
              onMouseLeave={stopScrolling}
            >
              {"<"}
            </StyledButton>
            <TagsFlex ref={tagsRef} onTagClicked={onTagClicked} />
            <StyledButton
              padding="12px"
              margin="0 8px 8px 4px"
              color="#af8e69"
              hoverColor="#7b4c2a"
              onMouseEnter={() => keepScrolling(1.6)}
              onMouseLeave={stopScrolling}
            >
              {">"}
            </StyledButton>
          </Flex>
        </CustomDiv>
        <CustomDiv
          fontSize="18px"
          gridArea="f"
          backgroundColor="#dbdbdb88"
          padding="8px"
        >
          <StyledSelect
            innerProps={{ placeholder: "Calories" }}
            components={{ ValueContainer: CustomValueContainer }}
            placeholder=""
            options={calorieOptions}
            classNamePrefix="filter-select"
            onChange={kcal => setCalories(kcal.value)}
          />
          <StyledSelect
            innerProps={{ placeholder: "Sort by" }}
            components={{ ValueContainer: CustomValueContainer }}
            placeholder=""
            options={sortOptions}
            classNamePrefix="filter-select"
            onChange={sortBy => setSortBy(sortBy.value)}
          />
          <StyledSelect
            innerProps={{ placeholder: "Exclude" }}
            components={{ ValueContainer: CustomValueContainer }}
            placeholder=""
            options={excludeOptionsState}
            classNamePrefix="filter-select"
            onInputChange={(str, { action }) => {
              if (action === "input-change") {
                const filteredOptions = [...excludeOptions].filter(
                  opt => !opt.recent
                )
                filteredOptions.push({
                  value: str,
                  label: str,
                  recent: true,
                })
                setExcludeOptionsState(filteredOptions)
              }
            }}
            onChange={exc => setExclude(exc.value)}
          />
        </CustomDiv>
        <DrinksContainer>
          <DrinksGrid
            calories={calories}
            exclude={exclude}
            sortBy={sortBy}
            searchQuery={searchQuery}
          />
        </DrinksContainer>
      </Container>
    </Layout>
  )
}

export default Explore

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
