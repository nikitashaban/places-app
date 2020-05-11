import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "../MainHeader";
import NavLinks from "../NavLinks";
import SideDrawer from "../SideDrawer";
import Backdrop from "../../UIElements/Backdrop";
import styles from "./style.module.scss";

const MainNavigation: React.FC = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
  console.log(drawerIsOpen);
  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={() => setDrawerIsOpen(false)} />}

      <SideDrawer show={drawerIsOpen}>
        <nav className={styles.mainNavigation__drawerNav}>
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className={styles.mainNavigation__menuBtn}
          onClick={() => setDrawerIsOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>

        <h1 className={styles.mainNavigation__title}>
          <Link to="/">Your places </Link>
        </h1>

        <nav className={styles.mainNavigation__headerNav}>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
