import React from "react";
import { Chat } from "../components/chat/Chat";
import { Conversations } from "../components/conversations/Conversations";

export const ChatScreen = () => {
  return (
    <div className="main__content">
      <Conversations />
      <Chat />
    </div>
  );
};
