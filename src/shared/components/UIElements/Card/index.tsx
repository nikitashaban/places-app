import React from "react";
import styles from "./style.module.scss";

type CardProps = {
  style?: object;
};

const ComponentName: React.FC<CardProps> = ({ style, children }) => {
  return (
    <div className={`${styles.card}`} style={style}>
      {children}
    </div>
  );
};

export default ComponentName;
