import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/User";
import { getToken } from "../../helpers/getToken";
import { types } from "../../types/types";
import { Read } from "../read/Read";
import { UnreadChat } from "../unread/UnreadChat";
import { Options } from "./Options";
import { dateFrom } from "../../helpers/dateFrom";

import "./chat.css";

export const Chat = () => {
  const { user, dispatch } = useContext(UserContext);

  const { messages } = user;

  const [sendMsj, setSendMsj] = useState("");

  const { auth } = getToken();

  const handleSend = async (e) => {
    e.preventDefault();

    let temMessage = messages?.userMessages;

    if (messages?.chatId) {
      await axios
        .post(
          `https://novateva-codetest.herokuapp.com/room/${messages.chatId}/message`,
          {
            messageText: `${sendMsj}`,
          },
          {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          }
        )
        .then((response) => temMessage.push(response.data.post))
        .catch((error) => console.log("error:", error));

      await temMessage.sort((a, b) => {
        return dateFrom(a.createdAt) < dateFrom(b.createdAt);
      });

      dispatch({
        type: types.messages,
        payload: {
          ...messages,
          userMessages: temMessage,
        },
      });
    }
    setSendMsj("");
  };

  return (
    <div
      className={`main__chat ${messages.chatId ? "main__chat__active" : ""} `}
    >
      {messages && messages?.chatId ? (
        <div className="chat__container">
          <Options chat={messages.chatId} />
          <button
            onClick={() => dispatch({ type: types.messages, payload: "" })}
            className="chat__back"
          >
            <img
              className="chat__back__image"
              src="./assets/back.png"
              alt="back"
            />
          </button>
          <div className="chat__messages__container" id="conversationContainer">
            {messages?.userMessages.length > 0 ? (
              <>
                <UnreadChat />
                <Read />
              </>
            ) : (
              <div className="chat__messages__empty">
                <p className="chat__messages__empty__title">
                  Hmm... There seems to be no messages yet
                </p>
                <img
                  className="chat__messages__empty__image"
                  src="./assets/empty-messages.svg"
                  alt="no messages"
                />
              </div>
            )}
          </div>
          <div className="chat__input__message">
            <form
              className="chat__input__typer"
              onSubmit={(e) => handleSend(e)}
            >
              <input
                value={sendMsj}
                onChange={(e) => setSendMsj(e.target.value)}
                maxLength="200"
                className="chat__input__search"
                placeholder="Start typing here"
              />
              <button
                onClick={(e) => handleSend(e)}
                className="chat__input__typer__button"
              >
                <p className="chat__typer__button__text">Send</p>
                <img
                  className="chat__typer__button__image"
                  src="./assets/send.png"
                  alt="send"
                />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="default__background__chat"></div>
      )}
    </div>
  );
};
