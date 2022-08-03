import React, { useContext } from "react";
import { UserContext } from "../../context/User";

import "./user.css";

export const User = () => {
  const { user } = useContext(UserContext);

  const { firstName, lastName } = user;

  return (
    <div className="header__user">
      <img
        className="header__user__pic"
        src="./assets/usersProfile/user-1.svg"
        alt="user"
      />
      <span className="header__user__name">{`${firstName} ${lastName}`}</span>
    </div>
  );
};
