/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useState } from "react";
import Draggable from "react-draggable";
import Close from "../../assets/close.gif";
import Minimize from "../../assets/minimize.gif";
import Maximize from "../../assets/maximize.gif";

import "./Window.css";

export default function Window({
  id,
  handleCloseWindow,
  setHiddenWindows,
  hiddenWindows,
  isInPabel,
}) {
  const [isHidden, setIsHidden] = useState(false);
  const [isHidding, setIsHidding] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  const topRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const bottomRef = useRef(null);
  const windowRef = useRef(null);

  useEffect(() => {
    const resizableElement = windowRef.current;
    const styles = window.getComputedStyle(resizableElement);
    let width = parseInt(styles.width);
    let height = parseInt(styles.height);

    let xCord = 0;
    let yCord = 0;

    resizableElement.style.top = "100px";
    resizableElement.style.left = "100px";

    // Top resize
    const onMouseMoveTopResize = (e) => {
      const dy = e.clientY - yCord;
      height = height - dy;
      yCord = e.clientY;
      if (height >= 100) resizableElement.style.height = `${height}px`;
    };
    const onMouseUpTopResize = () => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };
    const onMouseDownTopResize = (e) => {
      yCord = e.clientY;
      const styles = window.getComputedStyle(resizableElement);
      resizableElement.style.bottom = styles.bottom;
      resizableElement.style.top = null;
      document.addEventListener("mouseup", onMouseUpTopResize);
      document.addEventListener("mousemove", onMouseMoveTopResize);
    };

    // Left resiZe
    const onMouseMoveLeftResize = (e) => {
      const dy = e.clientX - xCord;
      width = width - dy;
      xCord = e.clientX;
      if (width >= 100) resizableElement.style.width = `${width}px`;
    };
    const onMouseUpLeftResize = () => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };
    const onMouseDownLeftResize = (e) => {
      xCord = e.clientX;
      const styles = window.getComputedStyle(resizableElement);
      resizableElement.style.right = styles.right;
      resizableElement.style.left = null;
      document.addEventListener("mouseup", onMouseUpLeftResize);
      document.addEventListener("mousemove", onMouseMoveLeftResize);
    };

    // Bottom resize
    const onMouseMoveBottomResize = (e) => {
      const dy = e.clientY - yCord;
      height = height + dy;
      yCord = e.clientY;
      if (height >= 100) resizableElement.style.height = `${height}px`;
    };
    const onMouseUpBottomResize = () => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };
    const onMouseDownBottomResize = (e) => {
      yCord = e.clientY;
      const styles = window.getComputedStyle(resizableElement);
      resizableElement.style.top = styles.top;
      resizableElement.style.bottom = null;
      document.addEventListener("mouseup", onMouseUpBottomResize);
      document.addEventListener("mousemove", onMouseMoveBottomResize);
    };

    // Right resize
    const onMouseMoveRightResize = (e) => {
      const dy = e.clientX - xCord;
      width = width + dy;
      xCord = e.clientX;
      if (width >= 100) {
        resizableElement.style.width = `${width}px`;
      }
    };
    const onMouseUpRightResize = () => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };
    const onMouseDownRightResize = (e) => {
      xCord = e.clientX;
      const styles = window.getComputedStyle(resizableElement);
      resizableElement.style.left = styles.left;
      resizableElement.style.right = null;
      document.addEventListener("mouseup", onMouseUpRightResize);
      document.addEventListener("mousemove", onMouseMoveRightResize);
    };

    const resizeTop = topRef.current;
    resizeTop.addEventListener("mousedown", onMouseDownTopResize);
    const resizeLeft = leftRef.current;
    resizeLeft.addEventListener("mousedown", onMouseDownLeftResize);
    const resizeBottom = bottomRef.current;
    resizeBottom.addEventListener("mousedown", onMouseDownBottomResize);
    const resizeRight = rightRef.current;
    resizeRight.addEventListener("mousedown", onMouseDownRightResize);
  }, []);

  const handleHiedWindow = () => {
    setIsHidding(true);
    setTimeout(() => {
      setIsHidden(true);
      setIsHidding(false);
    }, 400);
    setHiddenWindows([...hiddenWindows, id]);
  };
  const handleWindowOpen = () => {
    setIsShowing(true);
    setTimeout(() => {
      setIsHidden(false);
      setIsShowing(false);
    }, 400);
    setHiddenWindows(hiddenWindows.filter((window) => window === id));
  };
  if (isInPabel) {
    return (
      <div className="panel-window" onClick={handleWindowOpen}>
        <img src="" alt="" />
        ya tut
      </div>
    );
  }

  return (
    <Draggable handle=".header" defaultPosition={{ x: 0, y: 0 }} scale={1}>
      <div
        className={`window ${id} ${isHidden ? "hidden" : ""} ${
          isHidding ? "hidding" : ""
        } ${isShowing ? "showing" : ""}`}
        style={{
          height: 100,
          width: 100,
          minHeight: 100,
          minWidth: 100,
        }}
        ref={windowRef}
      >
        <div className="top-border" ref={topRef} />
        <div className="header">
          <img src={Minimize} alt="" onClick={handleHiedWindow} />
          <img src={Maximize} alt="" />
          <img src={Close} alt="" onClick={handleCloseWindow} />
        </div>
        <div className="right-border" ref={rightRef} />
        <div className="left-border" ref={leftRef} />
        <div className="body"></div>
        <div className="bottom-border" ref={bottomRef} />
      </div>
    </Draggable>
  );
}
