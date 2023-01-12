import styled from "styled-components";
import { motion } from "framer-motion";
import ScreenComponent, { IScreenRefProps } from "./ScreenComponent";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const Circle = styled(motion.div)`
  background: tomato;
  height: 75px;
  width: 75px;
  place-self: center;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: 100%;
`;
const circleVariants = {
  start: {
    y: 20,
    opacity: 0,
  },
  end: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};
const wrapperVariants = {
  start: {},
  end: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
};
const ChainCircles = forwardRef<IScreenRefProps>(function ChainCircles(
  props,
  ref
) {
  const [isComponentShown, setIsComponentShown] = useState(false);
  const screenRef = useRef<IScreenRefProps>(null);
  const handleComponentShow = (isShown: boolean) => {
    setIsComponentShown(isShown);
  };
  useImperativeHandle(ref, () => screenRef.current as IScreenRefProps);
  return (
    <ScreenComponent ref={screenRef} handleComponentShow={handleComponentShow}>
      {isComponentShown && (
        <Wrapper variants={wrapperVariants} initial="start" animate="end">
          <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
        </Wrapper>
      )}
    </ScreenComponent>
  );
});

export default ChainCircles;
