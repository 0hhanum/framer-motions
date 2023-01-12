import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import ScreenComponent, { IScreenRefProps } from "./ScreenComponent";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, red, white);
  border-radius: 50%;
  cursor: grab;
`;
const wrapperVariants = {
  start: {
    y: 500,
  },
  animate: {
    y: 0,
    transition: {
      duration: 2,
    },
  },
};
const MotionValue = forwardRef<IScreenRefProps>(function MotionValue(
  props,
  ref
) {
  const [isComponentShown, setIsComponentShown] = useState(false);
  const screenRef = useRef<IScreenRefProps>(null);
  const xPos = useMotionValue(0);
  const handleComponentShow = (isShown: boolean) => {
    setIsComponentShown(isShown);
  };
  useImperativeHandle(ref, () => screenRef.current as IScreenRefProps);
  return (
    <ScreenComponent
      ref={screenRef}
      hasOwnWrapper={true}
      handleComponentShow={handleComponentShow}
    >
      {isComponentShown ? (
        <>
          <span>BOUNCE IT</span>
          <Wrapper
            style={{ x: xPos }}
            drag="y"
            dragSnapToOrigin
            dragElastic={0.1}
            variants={wrapperVariants}
            initial="start"
            animate="animate"
          ></Wrapper>
        </>
      ) : null}
    </ScreenComponent>
  );
});

export default MotionValue;
