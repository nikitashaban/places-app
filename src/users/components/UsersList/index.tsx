import React from "react";

import Card from "../../../shared/components/UIElements/Card";
import { RootState } from "../../../reducers";
import UserItem from "../UserItem/";
import styles from "./style.module.scss";

interface IUsersList {
  usersList: RootState['users']['usersList']
}

const UserList: React.FC<IUsersList> = ({ usersList }) => {

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
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};

export default UserList;
