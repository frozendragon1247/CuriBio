// Install dependencies
const express = require("express");
const bodyParser = require("body-parser");
const UserRouter = require("./route/user");

// Configure express
const app = express();
app.use(bodyParser.json());

app.use("/user", UserRouter);

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
