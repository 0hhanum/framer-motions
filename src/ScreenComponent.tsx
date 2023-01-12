import styled from "styled-components";
import { motion, useAnimationControls } from "framer-motion";
import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";

interface IScreenProps {
  children: ReactNode;
  handleComponentShow?: (isShown: boolean) => void;
  hasOwnWrapper?: boolean;
}
interface IBox {
  hasOwnWrapper?: boolean;
}
export interface IScreenRefProps {
  handleSetMoveToRight: () => void;
  handleSetMoveToLeft: () => void;
  handleSetComeFromRight: () => void;
  handleSetComeFromLeft: () => void;
  renderFirstComponent: () => void;
}
const Box = styled(motion.div)<IBox>`
  margin: 0px calc(50% - 100px);
  width: 200px;
  height: 200px;
  border-radius: 20px;
  display: none; // comeFrom 함수 사용으로 grid로 전환
  background-color: ${(props) =>
    props.hasOwnWrapper ? "transparent" : "rgba(255, 255, 255, 0.2)"};
  position: absolute;
`;

const ScreenComponent = forwardRef<IScreenRefProps, IScreenProps>(
  function ScreenComponent(props, ref) {
    const boxRef = useRef<HTMLDivElement>(null);
    const animationController = useAnimationControls();
    useImperativeHandle(ref, () => ({
      async handleSetMoveToRight() {
        await animationController.set({
          translateX: 0,
        });
        await animationController.start({
          translateX: 2000,
          scale: 0,
          transition: {
            duration: 0.8,
          },
        });
        if (props.handleComponentShow) props.handleComponentShow(false);
        (boxRef.current as HTMLDivElement).style.display = "none";
      },
      async handleSetMoveToLeft() {
        await animationController.set({
          translateX: 0,
        });
        await animationController.start({
          translateX: -2000,
          scale: 0,
          transition: {
            duration: 0.8,
          },
        });
        if (props.handleComponentShow) props.handleComponentShow(false);
        (boxRef.current as HTMLDivElement).style.display = "none";
      },
      async handleSetComeFromRight() {
        (boxRef.current as HTMLDivElement).style.display = "block";
        animationController.set({
          translateX: 2000,
          scale: 0,
          opacity: 0,
        });
        await animationController.start({
          translateX: 0,
          scale: 1,
          opacity: 1,
          transition: {
            duration: 0.8,
          },
        });
        if (props.handleComponentShow) props.handleComponentShow(true);
      },
      async handleSetComeFromLeft() {
        (boxRef.current as HTMLDivElement).style.display = "block";
        animationController.set({
          translateX: -2000,
          scale: 0,
        });
        await animationController.start({
          translateX: 0,
          scale: 1,
          transition: {
            duration: 0.8,
          },
        });
        if (props.handleComponentShow) props.handleComponentShow(true);
      },
      renderFirstComponent() {
        (boxRef.current as HTMLDivElement).style.display = "block";
        if (props.handleComponentShow) props.handleComponentShow(true);
      },
    }));
    return (
      <Box
        animate={animationController}
        ref={boxRef}
        hasOwnWrapper={props.hasOwnWrapper || false}
      >
        {props.children}
      </Box>
    );
  }
);

export default ScreenComponent;
