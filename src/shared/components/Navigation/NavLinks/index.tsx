import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setIsUserLogged } from "../../../../ducks/users";
import { RootState } from "../../../../reducers";
import styles from "./style.module.scss";

const NavLinks: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.users.isLoggedIn);
  return (
    <ul className={styles.navLinks}>
      <li>
        <NavLink activeClassName={styles.activeNavLinks} to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      <li>
        {isLoggedIn && (
          <NavLink activeClassName={styles.activeNavLinks} to="/1/places">
            MY PLACES
          </NavLink>
        )}
      </li>
      <li>
        {isLoggedIn && (
          <NavLink activeClassName={styles.activeNavLinks} to="/places/new">
            ADD PLACE
          </NavLink>
        )}
      </li>
      <li>
        {!isLoggedIn && (
          <NavLink activeClassName={styles.activeNavLinks} to="/auth">
            AUTHENTICATE
          </NavLink>
        )}
      </li>
      {isLoggedIn && (
        <li>
          <button onClick={() => dispatch(setIsUserLogged(false))}>
            LOGOUT
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
