import styled from "styled-components";
import { motion, useAnimation, useVelocity } from "framer-motion";
import ScreenComponent, { IScreenRefProps } from "./ScreenComponent";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface ICircle {
  order: 1 | 2 | 3 | 4;
}
const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const Circle = styled.div<ICircle>`
  width: 0;
  height: 0;
  border-bottom: 50px solid white;
  border-top: 50px solid transparent;
  border-left: 50px solid white;
  border-right: 50px solid transparent;
  place-self: center;
  transform: ${(props) =>
    props.order === 2
      ? `rotateZ(90deg)`
      : props.order === 3
      ? "rotateZ(270deg)"
      : props.order === 4
      ? "rotateZ(180deg)"
      : ""};
`;
const Text = styled.span`
  position: absolute;
  top: -150px;
  font-size: 80px;
  font-weight: bold;
  color: black;
`;
let scrollUpBubble: null | NodeJS.Timeout = null;
let scrollDownBubble: null | NodeJS.Timeout = null;

const Scrolling = forwardRef<IScreenRefProps>(function Scrolling(props, ref) {
  useImperativeHandle(ref, () => screenRef.current as IScreenRefProps);
  const screenRef = useRef<IScreenRefProps>(null);
  const controller = useAnimation();
  const [scrollVal, setScrollVal] = useState(0);
  const [accelerator, setAccelerator] = useState(1);
  const handleMouseWheelEvent = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      // wheel down
      if (scrollUpBubble !== null) {
        setAccelerator((current) => current * 1.1);
      }
      scrollUpBubble = setTimeout(() => {
        scrollUpBubble = null;
        setAccelerator(1);
      }, 500);
      setScrollVal((current) => current + 30 * accelerator);
    } else {
      // wheel up
      scrollUpBubble = null;
      setScrollVal((current) => current - 30);
    }
    controller.start({
      rotateZ: `${scrollVal}deg`,
    });
  };
  return (
    <ScreenComponent ref={screenRef}>
      <Text>Scroll</Text>
      <Wrapper onWheel={handleMouseWheelEvent} animate={controller}>
        <Circle order={1} />
        <Circle order={2} />
        <Circle order={3} />
        <Circle order={4} />
      </Wrapper>
    </ScreenComponent>
  );
});

export default Scrolling;
