import React, { useContext } from "react";
// import { AppContext } from "../../../../../context/AppContext";
import { UserContext } from "../../context/User";
import { dateFrom } from "../../helpers/dateFrom";
import { Message } from "../message/Message";
import "./unread.css";

export const UnreadChat = () => {
  const { user } = useContext(UserContext);

  const { conversations, messages } = user;

  let unRead = [];

  if (messages?.userMessages) {
    const chat = conversations.find((chat) => chat._id === messages.chatId);

    if (chat?._id) {
      chat?.messages.sort((a, b) => {
        return dateFrom(a.createdAt) < dateFrom(b.createdAt);
      });

      unRead = chat.messages?.filter((msj) => {
        if (msj.readByRecipients.length <= 1) {
          if (msj.readByRecipients?.some((u) => u.readByUserId === user._id)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
    }
    return (
      <div
        style={
          unRead.length > 0
            ? { display: "flex", flexDirection: "column" }
            : { display: "none" }
        }
      >
        <div className="unread">
          <p>UNREAD</p>
          <hr />
        </div>
        {unRead.length > 0
          ? unRead.map((msj) => {
              return (
                <Message
                  key={msj._id}
                  user={user}
                  id={msj._id}
                  date={msj.createdAt}
                  content={msj.message.messageText}
                  postedBy={msj.postedByUser}
                />
              );
            })
          : ""}
      </div>
    );
  }
};
