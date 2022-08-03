import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import html2canvas from "html2canvas";

import { UserContext } from "../../context/User";
import { types } from "../../types/types";
import { Loader } from "../loader/Loader";

import axios from "axios";
import { getToken } from "../../helpers/getToken";

import swal from "sweetalert";

export const Options = ({ chat }) => {
  const { user, dispatch } = useContext(UserContext);

  const { conversations } = user;

  const { auth } = getToken();

  const [loadingComplaint, setLoadingCompl] = useState(false);
  const [redirectComplaint, setRedirectCompl] = useState(false);

  const handleComplaints = async () => {
    setLoadingCompl(true);

    const element = document.getElementById("conversationContainer");
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL("image/png", 1.0);

    dispatch({
      type: types.imageUrl,
      payload: image,
    });

    if (image) {
      setRedirectCompl(true);
      setTimeout(() => {
        setLoadingCompl(false);
        setRedirectCompl(false);
      }, 500);
    }
  };
  const chatId = chat;

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once the user is deleted, you will not recover the chat.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios
            .delete(
              `https://novateva-codetest.herokuapp.com/delete/room/${chatId}`,
              {
                headers: { Authorization: `Bearer ${auth}` },
              }
            )
            .then(() => {
              dispatch({
                type: types.getConversation,
                payload: conversations.filter((chat) => chat?._id !== chatId),
              });
              dispatch({
                type: types.messages,
                payload: "",
              });
              swal("Successfully deleted user!!", {
                icon: "success",
              });
            });
        } else {
          swal("User not deleted.");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="chat__options">
        <button onClick={handleComplaints} className="button__fab">
          {loadingComplaint ? (
            <Loader />
          ) : (
            <img src="./assets/red-flag.png" alt="complaints" />
          )}
        </button>
        <button onClick={handleDelete} className="button__fab">
          {false ? <Loader /> : <img src="./assets/trash.svg" alt="trash" />}
        </button>
      </div>
      {redirectComplaint ? (
        <Navigate to="/home/complaints" replace={true} />
      ) : (
        ""
      )}
    </>
  );
};
