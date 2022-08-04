import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/Auth";

export const GlobalContext = createContext();

export const AuthContext = ({ children }) => {
  let initialState = {
    isLoggedIn: false,
    error: false,
    token: {},
    redirect: false,
    user: {},
  };

  const init = () => {
    return JSON.parse(sessionStorage.getItem("auth")) || initialState;
  };

  const [state, dispatch] = useReducer(authReducer, initialState, init);

  useEffect(() => {
    sessionStorage.setItem("auth", JSON.stringify(state));
  }, [initialState, authReducer]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
