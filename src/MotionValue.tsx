import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion";
import ScreenComponent, { IScreenRefProps } from "./ScreenComponent";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, red, white);
  border-radius: 50%;
  cursor: grab;
`;
const Text = styled.span`
  position: absolute;
  top: 0;
  z-index: 10;
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
  const [isTextShown, setIsTextShown] = useState(false);
  const screenRef = useRef<IScreenRefProps>(null);
  const yPos = useMotionValue(0);
  const scale = useTransform(yPos, [-500, 0], [3, 1]); // yPost -500~0 -> 3~1로 변환
  const handleComponentShow = (isShown: boolean) => {
    setIsComponentShown(isShown);
    if (isShown) {
      setTimeout(() => {
        setIsTextShown(true);
      }, 2000);
    } else {
      setIsTextShown(false);
    }
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
          {isTextShown ? <Text>BOUNCE ME</Text> : null}
          <Wrapper
            style={{ y: yPos, scale }}
            drag="y"
            dragSnapToOrigin
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
