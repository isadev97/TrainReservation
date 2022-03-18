import {
  TOTAL_SEATS,
  SEATS_IN_EACH_ROW,
  SEATS_IN_LAST_ROW,
  RESERVED_SEAT,
  VACANT_SEAT,
} from "./constants";

/*
This function will fill a seat with a random value either reserved or vacant
*/
const fillASeatWithRandomValue = () => {
  const x = Math.floor(Math.random() * 2);
  if (x == 0) {
    return VACANT_SEAT;
  } else if (x == 1) {
    return RESERVED_SEAT;
  }
};

/*
This function will return a matrix of seatMatrix already filled with random values that is either reserved or vacant 
This function will also return the count of reserved seats and vacant seats
*/

export const generateTrainRows = () => {
  const NumberOfrows = Math.floor(TOTAL_SEATS / SEATS_IN_EACH_ROW);
  let reservedSeatCount = 0;
  let vacantSeatCount = 0;
  const seatMatrix = [];
  for (let i = 0; i < NumberOfrows; i++) {
    const row = [];
    for (let j = 0; j < SEATS_IN_EACH_ROW; j++) {
      const randomSeatValue = fillASeatWithRandomValue();
      if (randomSeatValue === RESERVED_SEAT) {
        reservedSeatCount += 1;
      } else if (randomSeatValue === VACANT_SEAT) {
        vacantSeatCount += 1;
      }
      row.push(randomSeatValue);
    }
    seatMatrix.push(row);
  }
  const lastRow = [];
  for (let j = 0; j < SEATS_IN_LAST_ROW; j++) {
    const randomSeatValue = fillASeatWithRandomValue();
    if (randomSeatValue === RESERVED_SEAT) {
      reservedSeatCount += 1;
    } else if (randomSeatValue === VACANT_SEAT) {
      vacantSeatCount += 1;
    }
    lastRow.push(randomSeatValue);
  }
  seatMatrix.push(lastRow);
  return [seatMatrix, reservedSeatCount, vacantSeatCount];
};
