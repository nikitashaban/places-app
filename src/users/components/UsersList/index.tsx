import React from "react";
import { useSelector } from "react-redux";

import Card from "../../../shared/components/UIElements/Card";
import { RootState } from "../../../reducers";
import UserItem from "../UserItem/";
import styles from "./style.module.scss";

const UserList: React.FC = () => {
  const usersList = useSelector((state: RootState) => state.users.usersList);

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
