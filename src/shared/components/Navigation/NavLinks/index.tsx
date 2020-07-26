import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentUser } from "../../../../ducks/users";
import { RootState } from "../../../../reducers";
import styles from "./style.module.scss";

const NavLinks: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.users);
  const logoutHandler = () => {
    dispatch(setCurrentUser(null))
    localStorage.clear()
  }
  return (
    <ul className={styles.navLinks}>
      <li>
        <NavLink activeClassName={styles.activeNavLinks} to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      <li>
        {currentUser?.token && (
          <NavLink activeClassName={styles.activeNavLinks} to={`/${currentUser.userId}/places`}>
            MY PLACES
          </NavLink>
        )}
      </li>
      <li>
        {currentUser?.token && (
          <NavLink activeClassName={styles.activeNavLinks} to="/places/new">
            ADD PLACE
          </NavLink>
        )}
      </li>
      <li>
        {!currentUser?.token && (
          <NavLink activeClassName={styles.activeNavLinks} to="/auth">
            AUTHENTICATE
          </NavLink>
        )}
      </li>
      {currentUser?.token && (
        <li>
          <button onClick={logoutHandler}>
            LOGOUT
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
