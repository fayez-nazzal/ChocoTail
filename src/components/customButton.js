import styled from "styled-components"

export default styled.button`
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  font-size: ${props => props.fontSize};
  background-color: ${props => props.color};
  border: none;
  border-radius: 2px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${props => props.hoverColor};
  }
`
