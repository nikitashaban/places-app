import React from "react";

import styles from "./style.module.scss";

const MainNavigation: React.FC = ({ children }) => {
  return <header className={styles.mainHeader}>{children}</header>;
};

export default MainNavigation;
