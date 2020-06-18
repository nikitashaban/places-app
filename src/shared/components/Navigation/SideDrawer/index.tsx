import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./style.module.scss";

interface SideDrawerProps {
  show: boolean;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ children, show }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className={styles.sideDrawer}>{children}</aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("drawer-hook") as HTMLDivElement
  );
};

export default SideDrawer;
