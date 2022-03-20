import React, { useState } from "react";
import UserInput from "./components/UserInput";
import StatusBar from "./components/StatusBar";
import SeatMatrix from "./components/SeatMatrix";
import SeatNumbers from "./components/SeatNumbers";
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

  /*
    Function to allocate seats in same row
  */
  const allocateSeatsInSameRow = (rowIndex) => {
    const cloneMatrix = getCloneMatrix(seatMatrix);
    let seatsToBeBooked = userInput;
    for (let j = 0; j < cloneMatrix[rowIndex].length; j++) {
      if (cloneMatrix[rowIndex][j] === VACANT_SEAT && seatsToBeBooked > 0) {
        cloneMatrix[rowIndex][j] = RESERVED_SEAT;
        seatsToBeBooked--;
        const seatNumber = String(rowIndex + 1) + String(j + 1);
        setBookedSeats([...bookedSeats, seatNumber]);
        console.log(bookedSeats)
      }
    }
    setSeats(cloneMatrix);
    setReservedSeats(reservedSeats + parseInt(userInput));
    setVacantSeats(vacantSeats - parseInt(userInput));
    cogoToast.success(
      "Tickets booked successfully, Please note down your seat numbers"
    );
  };

  /*
    Function to allocate seats nearby
  */
  const allocateSeatsNearBy = () => {
    const cloneMatrix = getCloneMatrix(seatMatrix);
    let seatsToBeBooked = userInput;
    for (let i = 0; i < cloneMatrix.length; i++) {
      for (let j = 0; j < cloneMatrix[i].length; j++) {
        if (cloneMatrix[i][j] === VACANT_SEAT && seatsToBeBooked > 0) {
          cloneMatrix[i][j] = RESERVED_SEAT;
          seatsToBeBooked--;
          const seatNumber = String(i + 1) + String(j + 1);
          setBookedSeats([...bookedSeats, seatNumber]);
          console.log(bookedSeats)
        }
      }
    }
    setSeats(cloneMatrix);
    setReservedSeats(reservedSeats + parseInt(userInput));
    setVacantSeats(vacantSeats - parseInt(userInput));
    cogoToast.success(
      "Tickets booked successfully, Please check your seat numbers in the green box below"
    );
  };

  /*
    Function to allocate seats
  */
  const allocateSeats = () => {
    const cloneMatrix = getCloneMatrix(seatMatrix);
    for (let i = 0; i < cloneMatrix.length; i++) {
      const row = cloneMatrix[i];
      const countOfVacantSeatsInARow = getCountOfSeatsInARow(row, VACANT_SEAT);
      if (countOfVacantSeatsInARow - userInput >= 0) {
        return allocateSeatsInSameRow(i);
      }
    }
    return allocateSeatsNearBy();
  };

  /*
    Function to handle book seats when user clicks on the button
  */
  const handleBookSeats = () => {
    if (isNaN(userInput)) {
      cogoToast.error("Invalid Input : Your input should be a number");
      return;
    } else if (userInput <= 0) {
      cogoToast.error("Invalid Input : You shoud book atleast 1 seat");
      return;
    } else if (userInput > MAX_SEATS_ALLOWED_TO_BOOK) {
      cogoToast.error(
        `Invalid Input : You can only book ${MAX_SEATS_ALLOWED_TO_BOOK} seats at a time`
      );
      return;
    } else if (vacantSeats - userInput < 0) {
      cogoToast.error(
        `Only ${vacantSeats} seats are left, Please book your seats accordingly`
      );
      return;
    } else {
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
