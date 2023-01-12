import styled from "styled-components";
import { motion } from "framer-motion";
import ScreenComponent, { IScreenRefProps } from "./ScreenComponent";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const Box = styled(motion.div)`
  width: 60%;
  height: 60%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  background: radial-gradient(
      circle at 50% 0,
      rgba(255, 0, 0, 0.5),
      rgba(255, 0, 0, 0) 70.71%
    ),
    radial-gradient(
      circle at 6.7% 75%,
      rgba(0, 0, 255, 0.5),
      rgba(0, 0, 255, 0) 70.71%
    ),
    radial-gradient(
        circle at 93.3% 75%,
        rgba(0, 255, 0, 0.5),
        rgba(0, 255, 0, 0) 70.71%
      )
      beige;
`;
const Drag = forwardRef<IScreenRefProps>(function Drag(props, ref) {
  const screenRef = useRef<IScreenRefProps>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => screenRef.current as IScreenRefProps);
  return (
    <ScreenComponent ref={screenRef}>
      <Wrapper ref={wrapperRef}>
        <Box drag dragConstraints={wrapperRef}>
          DRAG
        </Box>
      </Wrapper>
    </ScreenComponent>
  );
});

export default Drag;
