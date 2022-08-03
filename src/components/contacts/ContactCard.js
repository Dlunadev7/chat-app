import React, { useContext } from "react";
import axios from "axios";
import io from "socket.io-client";

import { UserContext } from "../../context/User.js";

import { UnreadFab } from "../unread/UnreadFab.js";
import { types } from "../../types/types.js";
import { useNavigate } from "react-router-dom";
import { dateFrom } from "../../helpers/dateFrom.js";
import { getUserName } from "../../helpers/getUserName.js";

import "./contactCard.css";

export const ContactCard = ({ id, chatId, photo }) => {
  const navigate = useNavigate();

  const { user, dispatch } = useContext(UserContext);

  const { conversations, contacts, newChat } = user;

  const { token } = JSON.parse(sessionStorage?.getItem("auth")) || "";

  const { auth } = token;

  const userMessages = conversations.find((chat) => chat._id === chatId);

  const handleMessages = async () => {
    if (newChat) {
      dispatch({ type: types.newChat });

      await axios
        .post(
          "https://novateva-codetest.herokuapp.com/room/initiate",
          {
            userIds: [user._id, id],
            type: "consumer-to-consumer",
          },
          {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          }
        )
        .catch((error) => console.error(error));

      await axios
        .get("https://novateva-codetest.herokuapp.com/room", {
          headers: { Authorization: `Bearer ${auth}` },
        })
        .then((resp) =>
          dispatch({
            type: types.getConversation,
            payload: resp?.data.conversation,
          })
        );
    } else {
      if (id !== user._id) {
        let socket = (chatRoomId) => {
          return io(
            `ws://novateva-codetest.herokuapp.com/?roomId=${chatRoomId}`
          );
        };

        await userMessages?.messages.sort((a, b) => {
          return dateFrom(a.createdAt) < dateFrom(b.createdAt);
        });

        dispatch({
          type: types.messages,
          payload: {
            chatId: chatId,
            userMessages: userMessages?.messages,
          },
        });

        await axios
          .put(
            `https://novateva-codetest.herokuapp.com/room/${chatId}/mark-read`,
            {},
            {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }
          )
          .catch((error) => console.error(error));
        socket(chatId).emit("new message", "new message");
      }
    }
    navigate("/home");
  };

  return (
    <div className="userCard" onClick={handleMessages}>
      <div className="userCard__container">
        <div className="userCard__picture__container">
          <img
            src="./assets/usersProfile/user-3.svg"
            className="userCard__picture"
            alt=""
          />
          <span
            className={
              false ? "userCard__online__pointer" : "userCard__offline__pointer"
            }
          ></span>
        </div>
        <div className="userCard__name">
          <p>
            {contacts?.length > 0 ? getUserName(contacts, id) : "Loading..."}
          </p>
          <p className="userCard__state">{false ? "Online" : "Offline"} </p>
        </div>
      </div>

      <div className="msj-number">
        <UnreadFab id={id} chatId={chatId} />
      </div>
    </div>
  );
};
