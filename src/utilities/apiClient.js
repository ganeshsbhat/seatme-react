export class ApiClient {

  // Make the POST request to the server to get the availability details
  postData(url= "", data = {}) {
    return fetch(url, {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  // Delegates the call to postData method to call API and fetch availability data.
  getAvailability(seatingData){
     return this.postData("/seatings/availability", seatingData);
  }
}
