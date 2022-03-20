import React from "react";
import { Alert, Button } from "react-bootstrap";
import "../css/seatbooked.css";

function SeatsBooked({ isBooked, seatsBooked, handleBookAgain }) {
  const seatBookedArr = seatsBooked.split(",").filter((val) => val !== "");
  return (
    <div className="seat-booked-container">
      {isBooked && (
        <Alert variant="info">
          <Alert.Heading>Your booked seat number(s) : </Alert.Heading>
          <ul className="seat-numbers-list">
            {seatBookedArr.map((seatNumber, index) => (
              <li key={index}>{seatNumber}</li>
            ))}
          </ul>
        </Alert>
      )}
      {isBooked && (
        <Button variant="outline-success" onClick={handleBookAgain}>
          Book Again 
        </Button>
      )}
    </div>
  );
}

export default SeatsBooked;
