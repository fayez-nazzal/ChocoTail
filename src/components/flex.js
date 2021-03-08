import styled from "styled-components"

export default styled.div`
  display: flex;
  overflow: hidden;
  justify-content: ${props => props.justifyContent};
  align-items: center;
`
