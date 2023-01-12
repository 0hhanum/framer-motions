import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion";
import ScreenComponent, { IScreenRefProps } from "./ScreenComponent";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

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
  font-weight: lighter;
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
  const xPos = useMotionValue(0);
  const gradient = useTransform(
    xPos,
    [-50, 120],
    [
      `radial-gradient(
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
      beige`,
      `radial-gradient(
        circle at 50% 0,
        rgb(4, 255, 0),
        rgba(255, 0, 0, 0) 70.71%
      ),
      radial-gradient(
        circle at 6.7% 75%,
        rgb(255, 0, 0),
        rgba(0, 0, 255, 0) 70.71%
      ),
      radial-gradient(
          circle at 93.3% 75%,
          rgb(0, 8, 255),
          rgba(0, 255, 0, 0) 70.71%
        )
        beige`,
    ]
  );
  useImperativeHandle(ref, () => screenRef.current as IScreenRefProps);
  return (
    <ScreenComponent ref={screenRef}>
      <Wrapper ref={wrapperRef}>
        <Box
          drag
          dragConstraints={wrapperRef}
          style={{ x: xPos, background: gradient }}
        >
          DRAG ME
        </Box>
      </Wrapper>
    </ScreenComponent>
  );
});

export default Drag;
