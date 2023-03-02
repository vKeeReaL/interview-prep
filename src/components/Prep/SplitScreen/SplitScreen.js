import styled from "@emotion/styled";

const StyledSplitScreen = styled.section`
  display: flex;
  & > div {
    flex: 1;
  }
`

export const SplitScreen = ({ left: Left, right: Right }) => {
  return (
    <StyledSplitScreen>
      <div>
        <Left />
      </div>
      <div>
        <Right />
      </div>
    </StyledSplitScreen>
  );
};
