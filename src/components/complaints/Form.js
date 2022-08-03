import React, { useContext, useState } from "react";
import axios from "axios";

import { Button } from "../button/Button";
import { UserContext } from "../../context/User";
import { getToken } from "../../helpers/getToken";

import radioData from "./radio.json";
import { types } from "../../types/types";

import "./form.css";
import { complaintNotification } from "../notification/toastNotification";

export const Form = () => {
  const { user, dispatch } = useContext(UserContext);

  const { imageUrl } = user;

  const { auth } = getToken();

  const [complaint, setComplaint] = useState("");
  const [complaintError, setComplaintError] = useState(false);
  const [radioChecked, setRadioChecked] = useState("");

  const handleSubmitComplaint = () => {
    if (auth && complaint.length > 0) {
      axios
        .post(
          "https://novateva-codetest.herokuapp.com/complaints",
          {
            description: `${complaint} ${radioChecked}`,
            file_64: `${imageUrl}`,
          },
          {
            headers: { Authorization: `Bearer ${auth}` },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setComplaint("");
            dispatch({ type: types.imageUrl, payload: "" });
          } else {
            setComplaintError(true);
          }
          complaintNotification(complaintError);
        })
        .catch(() => setComplaintError(true));
    }
  };

  const handleRadioChecked = ({ target }) => {
    setRadioChecked(target.value);
  };

  const handleCancel = () => {
    setComplaint("");
    setRadioChecked("");
    dispatch({ type: types.imageUrl, payload: "" });
  };

  const firstGroup = radioData.firstGroup.map(({ name }, i) => {
    return (
      <li className="complaints__report__item" key={i}>
        <label htmlFor={name}>
          <input
            type="radio"
            id={name}
            name={name}
            value={name}
            checked={radioChecked === name}
            onChange={(e) => handleRadioChecked(e)}
          />
          {name}
        </label>
      </li>
    );
  });

  const secondGroup = radioData.secondGroup.map(({ name }, i) => {
    return (
      <li className="complaints__report__item" key={i}>
        <label htmlFor={name}>
          <input
            type="radio"
            id={name}
            name={name}
            value={name}
            checked={radioChecked === name}
            onChange={(e) => handleRadioChecked(e)}
            className="complaints__report__item__input"
          />
          {name}
        </label>
      </li>
    );
  });

  return (
    <div className="complaints__report__container">
      <div className="complaints__description">
        <h2 className="complaints__title">Send Complaint</h2>
        <p className="complaints__paragraph-1">
          Here's a screenshot of the chat you want to report
        </p>
      </div>
      <form className="complaints__report">
        <div className="complaints__report__group">
          <ul className="complaints__report__group__container">{firstGroup}</ul>
          <ul className="complaints__report__group__container">
            {secondGroup}
          </ul>
        </div>
        <div className="complaints__report__description">
          <textarea
            className="complaints__report__textarea"
            maxLength={200}
            placeholder="Tell us about the problem"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          />
        </div>
      </form>
      <div className="complaints__buttons">
        <Button title="Cancel" handleClick={handleCancel} />
        {complaint.length > 0 || radioChecked ? (
          <Button title="Submit" handleClick={handleSubmitComplaint} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
