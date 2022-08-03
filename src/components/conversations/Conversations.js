import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/User";
import { types } from "../../types/types";
import { Contacts } from "../contacts/Contacts";
import { Button } from "../button/Button";

import "./conversation.css";

export const Conversations = () => {
  const { user, dispatch } = useContext(UserContext);

  const { conversations, firstName, lastName, isOnline } = user;

  useEffect(() => {
    const unRead = conversations?.map((chat) => {
      const unReadMessages = chat.messages.filter((msj) => {
        if (msj.readByRecipients.length <= 1) {
          if (msj.readByRecipients.some((u) => u.readByUserId !== user._id)) {
            return true;
          }
          return false;
        }
        return false;
      });
      return { chatId: chat._id, unRead: unReadMessages.length };
    });

    dispatch({ type: types.unreadMessages, payload: unRead });
  }, [conversations, dispatch, user._id]);

  const handleNewChat = () => {
    dispatch({ type: types.newChat });
  };

  return (
    <div className="main__conversation">
      <div className="conversation__container">
        <div className="conversation__user">
          <div className="conversation__user__container">
            <span className="conversation__user__image__container">
              <img
                className="conversation__user__image"
                src="./assets/usersProfile/user-1.svg"
                alt="user profile"
              />
              <span className="conversation__user__active"></span>
            </span>
            <span className="conversation__user__information">
              <p className="conversation__user__name">{`${firstName} ${lastName}`}</p>
              <p className="conversation__user__state">
                {" "}
                {isOnline ? "Online" : "Offline"}{" "}
              </p>
            </span>
          </div>
        </div>
        <Contacts />
        <div className="newchat__container">
          <Button title="New Chat" handleClick={handleNewChat} />
        </div>
      </div>
    </div>
  );
};
