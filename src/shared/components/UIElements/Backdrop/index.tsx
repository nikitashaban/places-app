import React from "react";
import ReactDOM from "react-dom";

import styles from "./style.module.scss";

type BackdropProps = {
  onClick: () => void;
};

const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={onClick}></div>,
    document.getElementById("backdrop-hook") as HTMLDivElement
  );
};

export default Backdrop;
