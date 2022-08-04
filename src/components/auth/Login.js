import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginNotification } from "../notification/toastNotification";
import { GlobalContext } from "../../context/Auth";
import { useForm } from "../../hooks/useForm";
import { types } from "../../types/types";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import "./auth.css";

export const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const [values, handleInputChange] = useForm(initialState);

  const { email, password } = values;

  const { state, dispatch } = useContext(GlobalContext);

  const { error } = state;

  const handleLogin = async (e) => {
    e.preventDefault();

    await axios
      .post("https://novateva-codetest.herokuapp.com/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        dispatch(
          {
            type: types.login,
            payload: {
              token: {
                email,
                auth: response?.data.authorization,
              },
              redirect: true,
              error: false,
              isLoggedIn: true,
            },
          },
          toast.success("Inicio de usuario con exito!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }),
          navigate("/home", { replace: true })
        );
      })
      .catch(() => {
        dispatch({ type: types.authError });
        loginNotification(email, password, error);
      });
  };

  return (
    <div className="form">
      <form className="form__dates" onSubmit={(e) => handleLogin(e)} autoComplete="off">
        <label className="form__place">
          Email
          <span className="form__place__container">
            <input
              className="form__place__input"
              type="text"
              name="email"
              placeholder="john_doe@gmail.com"
              value={email}
              onChange={(e) => handleInputChange(e)}
              autoComplete="off"
            />
          </span>
        </label>
        <label className="form__place">
          Password
          <span className="form__place__container">
            <input
              className="form__place__input"
              min={8}
              placeholder="********"
              type="password"
              name="password"
              value={password}
              onChange={(e) => handleInputChange(e)}
              autoComplete="off"
            />
          </span>
        </label>
        <span>
          ¿Need Account? <Link to={"/auth/signUp"}>Sign Up</Link>
        </span>
        <button className="form__submit" onClick={() => handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};
