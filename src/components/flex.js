import styled from "styled-components"

export default styled.div`
  display: flex;
  overflow: hidden;
  justify-content: ${({ justifyContent }) => justifyContent || "initial"};
  align-items: center;
  flex-wrap: ${({ wraps }) => (wraps ? "wrap" : "nowrap")};
`
