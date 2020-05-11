import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./style.module.scss";

const NavLinks: React.FC = () => {
  return (
    <ul className={styles.navLinks}>
      <li>
        <NavLink activeClassName={styles.activeNavLinks} to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName={styles.activeNavLinks} to="/1/places">
          MY PLACES
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName={styles.activeNavLinks} to="/places/new">
          ADD PLACE
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName={styles.activeNavLinks} to="/auth">
          AUTHENTICATE
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
