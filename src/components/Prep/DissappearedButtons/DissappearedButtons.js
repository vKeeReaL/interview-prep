import React, { useState } from "react";
import styled from "@emotion/styled";
import { SplitScreen } from "../SplitScreen/SplitScreen";

const StyledButton = styled.button`
  cursor: pointer;
  width: 100%;
  user-select: none;
`;

const DissappearedButtons = () => {
  const [isHide, setIsHide] = useState(false);

  const handleClick = (e) => {
    if (e.target.localName === "button") setIsHide(!isHide);
  };

  const LeftSide = () => <>{isHide && <StyledButton>Show 2</StyledButton>}</>;
  const RightSide = () => <>{!isHide && <StyledButton>Show 1</StyledButton>}</>;

  return (
    <div onClick={handleClick}>
      <SplitScreen left={LeftSide} right={RightSide} />
    </div>
  );
};

export default DissappearedButtons;
