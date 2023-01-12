import styled from "styled-components";
import { motion } from "framer-motion";
import ScreenComponent, { IScreenRefProps } from "./ScreenComponent";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, pink, green);
  color: black;
`;
const wrapperVariants = {
  start: {},
  end: {},
};
const Gestures = forwardRef<IScreenRefProps>(function Gestures(props, ref) {
  const [isComponentShown, setIsComponentShown] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const screenRef = useRef<IScreenRefProps>(null);
  const handleComponentShow = (isShown: boolean) => {
    setIsComponentShown(isShown);
  };
  useImperativeHandle(ref, () => screenRef.current as IScreenRefProps);
  const onHover = (isHover: boolean) => {
    setIsHover(isHover);
  };
  return (
    <ScreenComponent ref={screenRef} handleComponentShow={handleComponentShow}>
      <Wrapper
        whileTap={{ borderRadius: 0 }}
        whileHover={{ borderRadius: "50%", scale: 1.5 }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        {isHover ? "CLICK ME" : "HOVER ME"}
      </Wrapper>
    </ScreenComponent>
  );
});

export default Gestures;
