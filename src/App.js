import React, { useState} from 'react';
import UserInput from './components/UserInput';
import StatusBar from './components/StatusBar';
import SeatMatrix from './components/SeatMatrix';
import cogoToast from 'cogo-toast';
import { generateTrainRows } from './utils/utils';
import { TOTAL_SEATS } from './utils/constants';
import './App.css';

 

function App() {
  const [seatMatrix, reservedSeatsCount, vacantSeatCount] = generateTrainRows()
  const totalSeats = TOTAL_SEATS
  const [seats, setSeats] = useState(seatMatrix)
  const [reservedSeats, setReservedSeats] = useState(reservedSeatsCount)
  const [vacantSeats, setVacantSeats] = useState(vacantSeatCount)
  const [userInput, setUserInput] = useState(1)
  const handleBookSeats = () => {
    cogoToast.success('This is a success message!');
  }
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
      <SeatMatrix
        seats={seats}
      />
    </div>
  );
}

export default App;
