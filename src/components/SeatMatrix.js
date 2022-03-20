import React from "react";
import "../css/seatmatrix.css";
import {
  RESERVED_SEAT,
  RESERVED_SEAT_BG_COLOR,
  VACANT_SEAT_BG_COLOR,
} from "../utils/constants";

/*
React component to show seat matrix UI
*/
function SeatMatrixUi({ seats }) {
  return (
    <div className="seat-matrix">
      {seats.map((row, i) => (
        <div key={i} className="seat-matrix-row">
          {row.map((seat, j) => (
            <div
              key={j}
              className="seat-matrix-element"
              style={{
                background:
                  seat === RESERVED_SEAT
                    ? RESERVED_SEAT_BG_COLOR
                    : VACANT_SEAT_BG_COLOR,
              }}
            >
              {String(i + 1) + String(j + 1)}
              <br />
              {seat === RESERVED_SEAT ? "Reserved" : "Vacant"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SeatMatrixUi;
