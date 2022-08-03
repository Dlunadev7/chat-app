import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { getToken } from "../helpers/getToken";
import { userReducer } from "../reducers/User";
import { types } from "../types/types";

export const UserContext = createContext();

export const UserInformationContext = ({ children }) => {
  let initialState = {
    email: "",
    firstName: "",
    lastName: "",
    updatedAt: "",
    conversations: [],
    unread: [],
    isOnline: false,
    contacts: [],
    newChat: false,
    messages: {},
    imageUrl: "",
  };

  

  const init = () => {
    return JSON.parse(sessionStorage.getItem("user")) || initialState;
  };

  const [user, dispatch] = useReducer(userReducer, initialState, init);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const { auth } = getToken();

  useEffect(() => {
    const { token } =
      JSON.parse(sessionStorage?.getItem("auth")) || initialState;

    const userEmail = token?.email;

    async function onReload() {
      await axios
        .get(`https://novateva-codetest.herokuapp.com/users`)
        .then((resp) => resp?.data.users)
        .then((resp) => resp?.find((item) => item?.email === userEmail))
        // .then((resp) => console.log(resp))
        .then((resp) => {
          dispatch({ type: types.user, payload: resp});
        })
        .catch((e) => console.error(e));
    }

    onReload();
  }, []);

  useEffect(() => {

    const getConversations = async () => {
      await axios
        .get("https://novateva-codetest.herokuapp.com/room", {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        })
        .then((resp) =>
          dispatch({
            type: types.getConversation,
            payload: resp?.data.conversation,
          })
        )
        .catch((error) => console.log(error));
    };

    getConversations();

    if (auth) {
      setInterval(() => {
        getConversations();
      }, 1500);
    }
    
  }, [auth]);

  useEffect(() => {
    async function getUser() {
      await axios
        .get(`https://novateva-codetest.herokuapp.com/users`)
        .then((resp) => {
          dispatch({ type: types.contactList, payload: resp?.data.users });
        })
        .catch((e) => console.error(e));
    }

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
