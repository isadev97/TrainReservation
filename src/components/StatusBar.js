import React from "react";
import { Button, Badge } from "react-bootstrap";
import "../css/statusbar.css";

/*
React component to show current status of seats in numbers that is total, reserved and vacant
*/
function StatusBar({ totalSeats, reservedSeats, vacantSeats }) {
  return (
    <>
      <div className="status-bar-row">
        <h1>Train Reservation App</h1>
      </div>
      <div>
        <div className="status-bar-row-total">
          <Button variant="info">
            Total Number of Seats <Badge bg="dark">{totalSeats}</Badge>
            <span className="visually-hidden"></span>
          </Button>
        </div>
        <div className="status-bar-row-reserved">
          <Button variant="danger">
            Reserved Number of Seats: <Badge bg="dark">{reservedSeats}</Badge>
            <span className="visually-hidden"></span>
          </Button>
        </div>
        <div className="status-bar-row-vacant">
          <Button variant="success">
            Vacant Number of Seats: <Badge bg="dark">{vacantSeats}</Badge>
            <span className="visually-hidden"></span>
          </Button>
        </div>
      </div>
    </>
  );
}

export default StatusBar;
