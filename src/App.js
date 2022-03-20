import React, { useState } from "react";
import UserInput from "./components/UserInput";
import StatusBar from "./components/StatusBar";
import SeatMatrix from "./components/SeatMatrix";
import SeatsBooked from "./components/SeatsBooked";
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
  const [isBooked, setIsBooked] = useState(false);
  const [seatsBooked, setSeatsBooked] = useState("");

  /*
    Function to allocate seats in same row
  */
  const allocateSeatsInSameRow = (rowIndex) => {
    const cloneMatrix = getCloneMatrix(seats);
    let seatsToBeBooked = userInput;
    let seatNumbers = "";
    for (let j = 0; j < cloneMatrix[rowIndex].length; j++) {
      if (cloneMatrix[rowIndex][j] === VACANT_SEAT && seatsToBeBooked > 0) {
        cloneMatrix[rowIndex][j] = RESERVED_SEAT;
        seatsToBeBooked--;
        const seatNumber = String(rowIndex + 1) + String(j + 1);
        seatNumbers += seatNumber + ",";
      }
    }
    setSeats(cloneMatrix);
    setReservedSeats(reservedSeats + parseInt(userInput));
    setVacantSeats(vacantSeats - parseInt(userInput));
    setIsBooked(true);
    setSeatsBooked(seatNumbers);
    cogoToast.success("Tickets booked successfully", {
      heading: "Success",
      position: "top-right",
    });
  };

  /*
    Function to allocate seats nearby
  */
  const allocateSeatsNearBy = () => {
    const cloneMatrix = getCloneMatrix(seats);
    let seatNumbers = "";
    let seatsToBeBooked = userInput;
    for (let i = 0; i < cloneMatrix.length; i++) {
      for (let j = 0; j < cloneMatrix[i].length; j++) {
        if (cloneMatrix[i][j] === VACANT_SEAT && seatsToBeBooked > 0) {
          cloneMatrix[i][j] = RESERVED_SEAT;
          seatsToBeBooked--;
          const seatNumber = String(i + 1) + String(j + 1);
          seatNumbers += seatNumber + ",";
        }
      }
    }
    setSeats(cloneMatrix);
    setReservedSeats(reservedSeats + parseInt(userInput));
    setVacantSeats(vacantSeats - parseInt(userInput));
    setIsBooked(true);
    setSeatsBooked(seatNumbers);
    cogoToast.success("Tickets booked successfully", {
      heading: "Success",
      position: "top-right",
    });
  };

  /*
    Function to allocate seats
  */
  const allocateSeats = () => {
    const cloneMatrix = getCloneMatrix(seats);
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
    if (isNaN(parseInt(userInput))) {
      cogoToast.error("Invalid Input : Your input should be a number", {
        heading: "Error",
        position: "top-right",
      });
      return;
    } else if (userInput <= 0) {
      cogoToast.error("Invalid Input : You shoud book atleast 1 seat", {
        heading: "Error",
        position: "top-right",
      });
      return;
    } else if (userInput > MAX_SEATS_ALLOWED_TO_BOOK) {
      cogoToast.error(
        `Invalid Input : You can only book ${MAX_SEATS_ALLOWED_TO_BOOK} seats at a time`,
        {
          heading: "Error",
          position: "top-right",
        }
      );
      return;
    } else if (vacantSeats - userInput < 0) {
      if (vacantSeats === 0) {
        cogoToast.warn("All seats are already booked, Please try again later !", {
          heading: "Warning",
          position: "top-right",
        });
      } else {
        cogoToast.warn(
          `Only ${vacantSeats} seats are left, Please book your seats accordingly !`,
          {
            heading: "Warning",
            position: "top-right",
          }
        );
      }

      return;
    } else {
      return allocateSeats();
    }
  };

  /* 
    Function to handle book seats again 
  */
  const handleBookAgain = () => {
    setIsBooked(false);
    setSeatsBooked("");
  };

  return (
    <div className="App">
      <StatusBar
        totalSeats={totalSeats}
        reservedSeats={reservedSeats}
        vacantSeats={vacantSeats}
      />
      {!isBooked && (
        <UserInput
          userInput={userInput}
          setUserInput={setUserInput}
          handleBookSeats={handleBookSeats}
        />
      )}
      <SeatsBooked
        isBooked={isBooked}
        seatsBooked={seatsBooked}
        handleBookAgain={handleBookAgain}
      />
      <SeatMatrix seats={seats} />
    </div>
  );
}

export default App;
