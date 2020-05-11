import React from "react";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import Card from "../../../shared/components/UIElements/Card";
import { State } from "../../../ducks/users";
import UserItem from "../UserItem/";
import styles from "./style.module.scss";

interface CurrentState {
  users: State;
}

const UserList: React.FC = () => {
  const typedUseSelector: TypedUseSelectorHook<CurrentState> = useSelector;
  const usersList = typedUseSelector((state) => state.users.usersList);
  if (usersList.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>Users not found</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className={styles.usersList}>
      {usersList.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};

export default UserList;
