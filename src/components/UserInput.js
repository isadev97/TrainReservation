import React from 'react';
import '../css/userinput.css'


function UserInput({ userInput, setUserInput, handleBookSeats}) {
  return (
    <div className="user-input">
      <input
        type="number"
        min="1"
        max="7"
        required
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleBookSeats} className='user-input-btn'>Book Seats</button>
      **You can only book a maximum of 7 seats at a time**
    </div>
  );
}

export default UserInput;
