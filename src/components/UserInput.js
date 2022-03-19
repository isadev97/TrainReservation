import React from "react";
import { Button, Alert } from "react-bootstrap";
import { MAX_SEATS_ALLOWED_TO_BOOK } from "../utils/constants";
import "../css/userinput.css";

/*
React component to take user input and allow booking of seats on button click
*/
function UserInput({ userInput, setUserInput, handleBookSeats }) {
  return (
    <div className="user-input-container">
      <input
        type="number"
        min="1"
        max="7"
        required
        value={userInput}
        className="user-input"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <Button
        variant="outline-primary"
        className="user-input-btn"
        onClick={handleBookSeats}
      >
        Book Tickets
      </Button>
      <Alert variant="warning" className="user-input-msg">
        <p>
          You can only book a maximum of {MAX_SEATS_ALLOWED_TO_BOOK} seats at a
          time
        </p>
      </Alert>
    </div>
  );
}

export default UserInput;
