import styled from "styled-components";
import { motion, useAnimationControls } from "framer-motion";
import ScreenComponent, { IScreenRefProps } from "./ScreenComponent";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: black;
  color: grey;
  cursor: pointer;
  border-radius: 20px;
  padding: 10px;
`;
const TextBox = styled(motion.div)`
  font-weight: lighter;
  font-size: 0.2px;
  overflow: hidden;
`;
const Span = styled(motion.span)`
  font-weight: lighter;
  font-size: 0.2px;
`;
const boxVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};
const spanVariants = {
  animate: {
    color: ["rgb(65,105,225)", "rgb(255,0,0)", "rgb(0,255,0)"],
    transition: {
      repeat: Infinity,
      duration: 0.5,
    },
  },
};
const PresenceAnimation = forwardRef<IScreenRefProps>(
  function PresenceAnimation(props, ref) {
    useImperativeHandle(ref, () => screenRef.current as IScreenRefProps);
    const screenRef = useRef<IScreenRefProps>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const controls = useAnimationControls();
    const toggleExpand = () => {
      setIsExpanded((current) => !current);
      if (isExpanded) {
        controls.start({
          scale: 2.5,
          translateY: -50,
        });
      } else {
        controls.start({
          scale: 1,
          translateY: 0,
        });
      }
    };
    return (
      <ScreenComponent ref={screenRef} hasOwnWrapper={true}>
        <Wrapper animate={controls} onClick={toggleExpand}>
          <TextBox variants={boxVariants} initial="initial" animate="animate">
            <Span variants={spanVariants}>
              A technique that is much less common is to
            </Span>
            <Span variants={spanVariants}>
              use variable fonts with an axis for adjustable
            </Span>
            <Span variants={spanVariants}>
              extenders. This means extenders can be
            </Span>
            <Span variants={spanVariants}>
              shortened or lengthened only as much as
            </Span>
            <Span variants={spanVariants}>
              needed. In a responsive context, this can
            </Span>
            <Span variants={spanVariants}>
              happen in tandem with reductions to the line
            </Span>
            <Span variants={spanVariants}>
              space and other properties. A technique that
            </Span>
            <Span variants={spanVariants}>
              is much less common is to use variable fonts
            </Span>
            <Span variants={spanVariants}>
              with an axis for adjustable extenders. This
            </Span>
            <Span variants={spanVariants}>
              means extenders can be shortened or
            </Span>
            <Span variants={spanVariants}>
              lengthened only as much as needed. In a
            </Span>
            <Span variants={spanVariants}>
              responsive context, this can happen in
            </Span>
            <Span variants={spanVariants}>
              tandem with reductions to the line space
            </Span>
            <Span variants={spanVariants}>
              and other properties. A technique that is
            </Span>
            <Span variants={spanVariants}>
              much less common is to use variable fonts
            </Span>
            <Span variants={spanVariants}>
              with an axis for adjustable extenders. This
            </Span>
            <Span variants={spanVariants}>
              means extenders can be shortened or
            </Span>
            <Span variants={spanVariants}>
              lengthened only as much as needed. In a
            </Span>
          </TextBox>
        </Wrapper>
      </ScreenComponent>
    );
  }
);

export default PresenceAnimation;
