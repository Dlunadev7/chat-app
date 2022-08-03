import React, { useContext } from "react";
import { Form } from "../components/complaints/Form";
import { UserContext } from "../context/User";

export const ComplaintsScreen = () => {
  const { user } = useContext(UserContext);

  const { imageUrl } = user;

  return (
    <div className="complaints">
      <div className="complaints__container">
        <div className="complaints__image__container">
          {imageUrl ? (
            <img className="complaints__image" src={imageUrl} alt="complaint" />
          ) : (
            <>
              <p className="no__reports">Nothing to report</p>
            </>
          )}
        </div>
        {imageUrl && <Form />}
      </div>
    </div>
  );
};
