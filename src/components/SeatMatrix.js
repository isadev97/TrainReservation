import React from 'react';
import '../css/seatmatrix.css'

function SeatMatrixUi({ seats }) {
  return (
    <div className="seat-matrix">
      {seats.map((seat, index) => (
        <div key={index} className="seat-matrix-row">
          {seat}
        </div>
      ))}
    </div>
  );
}

export default SeatMatrixUi;
