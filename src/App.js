import React, { useState } from "react";
import UserInput from "./components/UserInput";
import StatusBar from "./components/StatusBar";
import SeatMatrix from "./components/SeatMatrix";
import cogoToast from "cogo-toast";
import {
  generateTrainRows,
  getCloneMatrix,
  getCountOfSeatsInARow,
} from "./utils/utils";
import {
  MAX_SEATS_ALLOWED_TO_BOOK,
  TOTAL_SEATS,
  RESERVED_SEAT,
  VACANT_SEAT,
} from "./utils/constants";
import "./App.css";

/*
  Main app component of react 
*/
function App() {
  /*
    State Managements
  */
  const [seatMatrix, reservedSeatsCount, vacantSeatCount] = generateTrainRows();
  const totalSeats = TOTAL_SEATS;
  const [seats, setSeats] = useState(seatMatrix);
  const [reservedSeats, setReservedSeats] = useState(reservedSeatsCount);
  const [vacantSeats, setVacantSeats] = useState(vacantSeatCount);
  const [userInput, setUserInput] = useState(1);
  const [bookedSeats, setBookedSeats] = useState([0]);

  /*
    Function to allocate seats
  */
  const allocateSeats = () => {
    const cloneMatrix = getCloneMatrix(seatMatrix);
    for (let i = 0; i < cloneMatrix.length; i++) {
      const row = cloneMatrix[i];
      const countOfVacantSeatsInARow = getCountOfSeatsInARow(row, VACANT_SEAT);
      if (countOfVacantSeatsInARow - userInput >= 0) {
        /*
          Allocate seats in the same row
        */

        for (let j = 0; j < cloneMatrix[i].length; j++) {
          if (cloneMatrix[i][j] === VACANT_SEAT) {
            cloneMatrix[i][j] = RESERVED_SEAT;
          }
        }
      }
    }

    /*

    */
  };

  /*
    Function to handle book seats when user clicks on the button
  */
  const handleBookSeats = () => {
    if (userInput <= 0) {
      cogoToast.error("Invalid Input : You shoud book atleast 1 seat");
      return;
    }
    if (userInput > MAX_SEATS_ALLOWED_TO_BOOK) {
      cogoToast.error(
        `Invalid Input : You can only book ${MAX_SEATS_ALLOWED_TO_BOOK} seats at a time`
      );
      return;
    }
    if (vacantSeats - userInput >= 0) {
      return allocateSeats();
    }
  };

  return (
    <div className="App">
      <StatusBar
        totalSeats={totalSeats}
        reservedSeats={reservedSeats}
        vacantSeats={vacantSeats}
      />
      <UserInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleBookSeats={handleBookSeats}
      />
      <SeatMatrix seats={seats} />
    </div>
  );
}

export default App;
