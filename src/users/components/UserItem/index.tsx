import React from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import Avatar from "../../../shared/components/UIElements/Avatar";
import Card from "../../../shared/components/UIElements/Card";

type UserItemProps = {
  id: string;
  image: string;
  name: string;
  placeCount: number;
};

const UserItem: React.FC<UserItemProps> = ({ id, image, name, placeCount }) => {
  return (
    <li className={styles.userItem}>
      <Card>
        <Link to={`${id}/places`}>
          <div className={styles.userItem__image}>
            <Avatar image={image} alt={name} />
          </div>
          <div className={styles.userItem__info}>
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
