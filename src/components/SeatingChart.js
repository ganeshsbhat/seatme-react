import React from "react";
import "./SeatingChart.css";

//helpers
function getSeatId(row, column) {
  return `${String.fromCharCode(97 + row)}${column + 1}`;
}

// Returns an array with 1 to the range number specified
// We cannot use for loop inside JSX
function range(number) {
  return [...Array(number).keys()];
}

// component to display the Seating Chart
export function SeatingChart(props) {
  const seatSelections = props.seatSelections || [];

  const layout = props?.seatingData?.venue?.layout;

  // Collect all the available seats
  const availableSeats = Object.keys(
    props?.seatingData?.seats || {}
  ).map((key) => [key, props.seatingData.seats[key].status === "AVAILABLE"]); // creating a map of seatId => availablity

  // Map all the available seats
  const availableSeatMap = new Map(availableSeats);

  // Determines the color of Chair based on the STATUS
  function getSeatClass(seatId) {

    if (seatSelections.includes(seatId)) {
      return "seat-selected";
    } else if (availableSeatMap.get(seatId)) {
      return "seat-available";
    } else {
      return "seat-unavailable";
    }
  }

  // Return this JSX with all the seating detailsto the App component
  return (
    <table className="seating-chart">
    <tbody>
      {range(layout.rows).map((r) => (
        <tr key={r}>
          {range(layout.columns).map((c) => (
            <td key={c}>
              <div className="m-1 mr-3 ml-3">
                <i
                  className={`fa fa-chair chair ${getSeatClass(getSeatId(r, c))}`}
                />
                <div className="seat-label">{getSeatId(r, c)}</div>
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
  );
}
