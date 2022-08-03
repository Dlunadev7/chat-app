import React, { useContext } from "react";

import moment from "moment";

import "./message.css";
import { UserContext } from "../../context/User";
import { getUserNameChat } from "../../helpers/getUserName";
import axios from "axios";
import { types } from "../../types/types";
import { getToken } from "../../helpers/getToken";

export const Message = ({ id, date, content, postedBy }) => {
  const { user, dispatch } = useContext(UserContext);

  const { contacts, messages } = user;

  const dateFrom = moment(date).fromNow();

  const { auth } = getToken();

  const handleDelete = async () => {
    await axios
      .delete(`https://novateva-codetest.herokuapp.com/delete/message/${id}`, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .catch((error) => console.error(error));

    const delMsj = messages.userMessages.filter((msj) => msj._id !== id);

    dispatch({
      type: types.messages,
      payload: {
        ...messages,
        userMessages: delMsj,
      },
    });

    await axios
      .get("https://novateva-codetest.herokuapp.com/room", {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((response) =>
        dispatch({
          type: types.getConversation,
          payload: response?.data.conversation,
        })
      )
      .catch((error) => console.error(error));
  };

  return (
    <div
      className="chat__message"
      style={
        postedBy === user._id
          ? { alignItems: "flex-end" }
          : { alignItems: "flex-start" }
      }
    >
      <p className="chat__message__date">
        {postedBy === user._id ? (
          <img
            className="chat__message__trash"
            src="./assets/trash-can.svg"
            alt=""
            onClick={handleDelete}
          />
        ) : (
          ""
        )}
        {getUserNameChat(contacts, postedBy, user)}, {dateFrom}
      </p>
      <p className="chat__message__content">{content}</p>
    </div>
  );
};
