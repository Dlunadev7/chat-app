import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./auth.css";
import { useForm } from "../../hooks/useForm";
import { signUpNotification } from "../notification/toastNotification";
import { GlobalContext } from "../../context/Auth";
import { types } from "../../types/types";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignUp = () => {
  const initialState = {
    name: "",
    lastName: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const { dispatch } = useContext(GlobalContext);

  const [values, handleInputChange] = useForm(initialState);

  const { name, lastName, email, password } = values;

  const handleSignUp = async (e) => {
    e.preventDefault();

    await axios
      .post("https://novateva-codetest.herokuapp.com/users", {
        email: `${email}`,
        password: `${password}`,
        firstName: `${name}`,
        lastName: `${lastName}`,
        type: "consumer",
      })
      .then(() => {
        dispatch({ type: types.signUp });
        navigate("/auth/login", { replace: true });
        toast.success("¡Registracion de usuario con exito!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        dispatch({ type: types.authError });
        signUpNotification(name, lastName, email, password);
      });
  };

  return (
    <div className="form">
      <form className="form__dates" onSubmit={(e) => handleSignUp(e)} autoComplete="off">
        <label className="form__place">
          First Name
          <span className="form__place__container">
            <input
              name="name"
              className="form__place__input"
              type="text"
              placeholder="John"
              value={name}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </span>
        </label>
        <label className="form__place">
          Last Name
          <span className="form__place__container">
            <input
              name="lastName"
              className="form__place__input"
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </span>
        </label>
        <label className="form__place">
          Email
          <span className="form__place__container">
            <input
              name="email"
              className="form__place__input"
              type="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </span>
        </label>
        <label className="form__place">
          Password
          <span className="form__place__container">
            <input
              className="form__place__input"
              name="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </span>
        </label>
        <span>
          ¿Have Account? <Link to={"/auth/login"}>Log in</Link>
        </span>
        <button className="form__submit" onClick={(e) => handleSignUp(e)}>
          Sign Up
        </button>
      </form>
    </div>
  );
};
