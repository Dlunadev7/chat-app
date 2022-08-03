import React, { useContext } from "react";
import { UserContext } from "../../context/User";

export const UnreadFab = ({ id, chatId }) => {

  const { user } = useContext(UserContext);

  const { unread } = user;
  
    if (id !== user?._id) {
      if (unread?.length > 0) {
        const unReadMsg = unread.find((chat) => chat.chatId === chatId);

        if (unReadMsg) {
          if (unReadMsg.unRead > 0) {
            return (
              <p
                className="unread__messages"
              >
                {unReadMsg.unRead}
              </p>
            );
          }
        }
      }
    }

};
