import React, { useContext } from "react";
import { UserContext } from "../../context/User";
import { types } from "../../types/types";

import "./newChat.css";

export const NewChat = () => {
  const { dispatch } = useContext(UserContext);

  const handleNewChat = () => {
    dispatch({ type: types.newChat });
  };

  return (
    <button className="fab__new__chat" onClick={handleNewChat}>
      <img
        className="new__chat__image"
        src="./assets/messages.svg"
        alt="new chat"
      />
    </button>
  );
};
