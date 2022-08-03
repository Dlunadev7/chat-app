import React, { useContext } from "react";
import { UserContext } from "../../context/User";
import "./bell.css";

export const Bell = () => {
  const { user } = useContext(UserContext);
  const { unread } = user;

  const UnReadMessages = () => {
    if (unread?.length > 0) {
      const unreadMessage = unread?.map((chat) => chat.unRead);
      const reducer = unreadMessage.reduce((a, b) => a + b);
      if (reducer > 0) {
        return <span className="header__notification__count">{reducer}</span>;
      }
    }
  };

  return (
    <div className="header__notification">
      <img
        className="header__notification__icon"
        src="./assets/bell.svg"
        alt="Bell icon"
      />
      <UnReadMessages />
    </div>
  );
};
