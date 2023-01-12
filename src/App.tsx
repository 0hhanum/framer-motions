import styled from "styled-components";
import ChainCircles from "./ChainCircles";
import { IScreenRefProps } from "./ScreenComponent";
import Gestures from "./Gestures";
import C3 from "./C3";
import C4 from "./C4";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #348f50, #56b4d3);
  overflow: hidden;
`;
const ButtonDiv = styled.div<{ position: string }>`
  position: absolute;
  right: ${(props) => (props.position === "right" ? "15px" : null)};
  left: ${(props) => (props.position === "left" ? "15px" : null)};
`;
const CtrlButton = styled.button`
  background: none;
  font-size: 40px;
  cursor: pointer;
  color: white;
  font-weight: lighter;
`;
function App() {
  const screenRefs = useRef<(IScreenRefProps | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [currentRefIndex, setCurrentRefIndex] = useState(0);
  const onClickRightBtn = () => {
    screenRefs.current[currentRefIndex + 1]?.handleSetComeFromRight();
    screenRefs.current[currentRefIndex]?.handleSetMoveToLeft();
    setCurrentRefIndex((current) => current + 1);
  };
  const onClickLeftBtn = () => {
    screenRefs.current[currentRefIndex]?.handleSetMoveToRight();
    screenRefs.current[currentRefIndex - 1]?.handleSetComeFromLeft();
    setCurrentRefIndex((current) => current - 1);
  };
  useEffect(() => {
    screenRefs.current[0]?.renderFirstComponent();
    // 첫 번째 컴포넌트만 렌더링 (나머지는 display: none)
  }, []);
  return (
    <>
      <Wrapper>
        {currentRefIndex !== 0 ? (
          <ButtonDiv position="left">
            <CtrlButton onClick={onClickLeftBtn}>&lt;</CtrlButton>
          </ButtonDiv>
        ) : null}
        {currentRefIndex <= 1 ? (
          <ChainCircles
            ref={(el: IScreenRefProps) => (screenRefs.current[0] = el)}
          />
        ) : null}
        {currentRefIndex <= 2 ? (
          <Gestures
            ref={(el: IScreenRefProps) => (screenRefs.current[1] = el)}
          />
        ) : null}
        {currentRefIndex <= 3 && currentRefIndex > 0 ? (
          <C3 ref={(el: IScreenRefProps) => (screenRefs.current[2] = el)} />
        ) : null}
        {currentRefIndex <= 4 && currentRefIndex > 1 ? (
          <C4 ref={(el: IScreenRefProps) => (screenRefs.current[3] = el)} />
        ) : null}
        {currentRefIndex !== screenRefs.current?.length - 1 ? (
          <ButtonDiv position="right">
            <CtrlButton onClick={onClickRightBtn}>&gt;</CtrlButton>
          </ButtonDiv>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
