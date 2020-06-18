import React from "react";
import styles from "./style.module.scss";

interface CardProps {
  style?: object;
  className?: string;
}

const ComponentName: React.FC<CardProps> = ({ style, children, className }) => {
  return (
    <div className={`${styles.card} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default ComponentName;
