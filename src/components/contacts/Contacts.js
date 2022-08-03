import React, { useContext } from "react";

import { UserContext } from "../../context/User.js";
import { ContactCard } from "./ContactCard.js";
import { NewChat } from "../fab/NewChat.js";
import { findUserById } from "../../helpers/findUserById.js";

export const Contacts = () => {
  const { user } = useContext(UserContext);

  const { contacts, conversations, newChat } = user;

  return (
    <div className="user-list">
      <div className="open-chats">
        {newChat ? (
          <>
            <h3 className="newChat__title">Contactos en Novateva</h3>
            {contacts?.map((u) => {
              return u._id === user._id ? (
                false
              ) : (
                <>
                  <ContactCard key={u._id} id={u._id} img={u.img} />
                </>
              )
            })}
          </>
        ) : (
          conversations?.map((u) => {
            return (
              <ContactCard
                key={u._id}
                id={findUserById(user, u.userIds)}
                chatId={u._id}
              />
            );
          })
        )}
      </div>
      <NewChat />
    </div>
  );
};
