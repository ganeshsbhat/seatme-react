# seatME-React

An application built in react JS which will display the Best Available Seat based on the JSON input and number of the seats requested. This application is dependent on a rails application seatME, which will serve the data to this application. 

Clone this https://github.com/ganeshsbhat/seatME and make it up and running on port 3000, before using using this app.

### How to install seatME-React?

- Go to the project folder and run ```npm install```
- Build your apllication using ```npm run build```
  React app will be emitted in the /build folder
- Start your application using ```npm start```

While running the final step, you will receive a promt on command line saying that rails is already using port 3000, you can simply say that you need to use a different port, and then you will be assigned a port 3001 (or any other availabe port) for your app.

Note: In the package.json, we have set a proxy to 3000, which routes the API call to rails app.
