import styled from "styled-components";
import { motion } from "framer-motion";
import ScreenComponent, { IScreenRefProps } from "./ScreenComponent";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, pink, green);
`;
const wrapperVariants = {
  hover: { borderRadius: "50%", scale: 1.5 },
  click: { borderRadius: 0 },
};
const Gestures = forwardRef<IScreenRefProps>(function Gestures(props, ref) {
  const [isHover, setIsHover] = useState(false);
  const screenRef = useRef<IScreenRefProps>(null);
  useImperativeHandle(ref, () => screenRef.current as IScreenRefProps);
  const onHover = (isHover: boolean) => {
    setIsHover(isHover);
  };
  return (
    <ScreenComponent ref={screenRef}>
      <Wrapper
        variants={wrapperVariants}
        whileTap="click"
        whileHover="hover"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        {isHover ? "CLICK ME" : "HOVER ME"}
      </Wrapper>
    </ScreenComponent>
  );
});

export default Gestures;
