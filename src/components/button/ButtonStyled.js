import React, { useContext } from "react";
import { UserContext } from "../../context/User";

import "./buttonStyled.css";

export const ButtonStyled = ({ title, count = false, image = "" }) => {

  const { user } = useContext(UserContext)

  const { unread } = user;

  const UnReadMessages = () => {

    if (unread?.length > 0) {
      const unreadMessage = unread?.map((chat) => chat.unRead);
      const reducer = unreadMessage.reduce((a, b) => a + b);
      if (reducer > 0) {
        return <span className="sidebar__chat__count">{reducer}</span>;
      }
    }

  };

  return (
    <div className="buttonStyled">
      <img src={image} alt="chat icon" />
      <p className="button__title__styled">{title}</p>
      {count ? <UnReadMessages /> : ""}
    </div>
  );
};
