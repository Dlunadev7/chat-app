import React, { useContext } from "react";

import { UserContext } from "../../context/User";
import { getFilteredContacts } from "../../helpers/getFilteredContacts";
import { useForm } from "../../hooks/useForm";

import "./search.css";

export const Search = () => {
  const { user } = useContext(UserContext);

  const { contacts } = user;

  const initialState = {
    typer: "",
  };

  const [values, handleInputChange, reset] = useForm(initialState);

  const { typer } = values;

  const contactFiltered = getFilteredContacts(contacts, typer);

  return (
    <>
      <div className="header__search">
        <div className="header__container__search">
          <img
            className="header__search__icon"
            src="./assets/Search-Icon.svg"
            alt=""
          />
          <input
            className="header__search__input"
            type="text"
            placeholder="User search"
            value={typer}
            onChange={(e) => handleInputChange(e)}
            name="typer"
          />
          {typer.length > 0 && (
            <button className="header__search__close" onClick={reset}>
              <img
                className="header__search__close__image"
                src="./assets/close.png"
                alt="close"
              />
            </button>
          )}
        </div>
      </div>
      {typer.length > 0 && (
        <div className="header__search__results">
          {contactFiltered?.map(({ firstName, lastName }, i) => {
            return (
              <div className="userCard" key={i}>
                <div className="userCard__container">
                  <div className="userCard__picture__container">
                    <img
                      src="./assets/usersProfile/user-1.svg"
                      className="userCard__picture"
                      alt=""
                    />
                  </div>
                  <div className="userCard__name">
                    <p>{`${firstName} ${lastName}`}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
