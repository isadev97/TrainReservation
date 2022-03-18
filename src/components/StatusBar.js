import React from 'react';
import '../css/statusbar.css';

function StatusBar({ totalSeats, reservedSeats, vacantSeats }) {
  return (
    <>
      <div className="status-bar-row">Train Reservation App</div>
      <div>
        <div className="status-bar-row-total">Total Number of Seats: {totalSeats}</div>
        <div className="status-bar-row-reserved">Reserved Number of Seats: {reservedSeats}</div>
        <div className="status-bar-row-vacant">Vacant Number of Seats: {vacantSeats}</div>
      </div>
    </>
  );
}

export default StatusBar;
