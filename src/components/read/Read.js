import React, { useContext } from "react";
import axios from "axios";

import "./read.css";

import { getToken } from "../../helpers/getToken";
import { UserContext } from "../../context/User";
import { Message } from "../message/Message";
import { dateFrom } from "../../helpers/dateFrom";

export const Read = () => {

  const { user } = useContext(UserContext);

  const { messages, conversations } = user;

  const { auth } = getToken();

  let read = [];

  if (conversations && auth) {
    const chat = conversations.find((chat) => chat._id === messages.chatId);

    if (chat?._id) {
      chat.messages.sort((a, b) => {
        return dateFrom(a.createdAt) < dateFrom(b.createdAt);
      });
      read = chat.messages.filter((msj) => {
        if (msj.readByRecipients.length >= 2) {
          return true;
        } else {
          if (msj.readByRecipients?.some((u) => u.readByUserId !== user._id)) {
            return true;
          } else {
            return false;
          }
        }
      });

      axios
        .put(
          `https://novateva-codetest.herokuapp.com/room/${messages.chatId}/mark-read`,
          {},
          {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          }
        )
        .catch((error) => console.error(error));
    }

    return (
      <div className="chat__messages">
        <div className="chat__messages__wrapper">
          {read.length > 0
            ? read?.map(({ _id, createdAt, message, postedByUser }) => {
                return (
                  <Message
                    key={_id}
                    user={user}
                    id={_id}
                    date={createdAt}
                    content={message.messageText}
                    postedBy={postedByUser}
                  />
                );
              })
            : ""}
        </div>
      </div>
    );
  }
};
