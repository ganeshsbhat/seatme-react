import React, { useState, useEffect } from "react";
import "./App.css";
import { ApiClient } from "../utilities/apiClient";
import { SeatingChart } from "./SeatingChart";
import "./SeatingChart.css";

const apiClient = new ApiClient();

const defaultSeatingInfo = {
  venue: {
    layout: {
      rows: 10,
      columns: 10,
    },
  },
  seats: {
    a1: {
      id: "a1",
      row: "a",
      column: 1,
      status: "AVAILABLE",
    },
    a2: {
      id: "a2",
      row: "a",
      column: 2,
      status: "AVAILABLE",
    },
  },
};

function App() {
  // Define the states
  const [availabilityData, updateAvailablityData] = useState({});
  const [seatingInfo, updateSeatingInfo] = useState(defaultSeatingInfo);
  const [bookingCount, updatebookingCount] = useState(2);

  // This state is to display red-background notating error, when invalid JSON provided
  const [isJsonValid, updateIsJsonValid] = useState(true);

  // 'UseEffect' will trigger an API call to fetch latest availability listening to:
  // availabilityData, seatingInfo & bookingCount
  useEffect(() => {
    const seatingData = {
      seating_info: seatingInfo,
      booking_count: bookingCount,
    };

    // Call client to place an API call
    apiClient.getAvailability(seatingData).then(
      (response) =>
        response.json().then(
          (availablityResponse) => {
            if(availablityResponse.errors && availablityResponse.errors[0]){
              alert(availablityResponse.errors[0]);
            }
            else{
              updateAvailablityData(availablityResponse);
              }
            },
          (err) => console.log(err)
        ),
      (err) => console.log(err)
    );
  }, [updateAvailablityData, seatingInfo, bookingCount]);

  // Update Seating Info based on the provided text
  // Also check if input JSON is valid
  function updateSeatingInfoFromText(seatInfoJsonText) {
    try {
      let info = JSON.parse(seatInfoJsonText);
      updateIsJsonValid(true);
      updateSeatingInfo(info);
    } catch (err) {
      updateIsJsonValid(false);
    }
  }

  // Return our HTML with all latest data
  return (
    <div className="container">
      <div className="App">
        <h1>Seat me</h1>
      </div>
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="seatNo">Number of seats to be booked</label>
            <input
              type="number"
              className="form-control"
              id="seatNo"
              placeholder="0"
              value={bookingCount}
              onChange={(e) => updatebookingCount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="seatAvaiablityInput">Seat Availability</label>
            <textarea
              className={`form-control ${isJsonValid ? "" : "has-error"}`}
              id="seatAvaiablityInput"
              rows={3}
              value={JSON.stringify(seatingInfo)}
              onChange={(e) => updateSeatingInfoFromText(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div>
        <div className="fa fa-chair chair seat-selected">Selected</div><br />
        <div className="fa fa-chair chair seat-available">Available</div><br />
        <div className="fa fa-chair chair seat-unavailable">Unavailable</div><br />
      </div>
      <div>
        <SeatingChart
          seatingData={seatingInfo}
          seatSelections={availabilityData.data}
        />
      </div>
    </div>
  );
}

export default App;
