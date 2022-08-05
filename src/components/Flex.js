import styled from "styled-components"

export default styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  margin: ${({ margin }) => margin || 0};
  overflow: hidden;
  justify-content: ${({ justifyContent }) => justifyContent || "initial"};
  align-items: center;
  flex-wrap: ${({ wraps }) => (wraps ? "wrap" : "nowrap")};
  padding: ${({ padding }) => padding || 0};
  background: ${({ bg }) => bg || "initial"};
`
