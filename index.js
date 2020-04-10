const express = require("express");
const app = express();
const mongoose = require("mongoose");

//Import routes
const authRoute = require("./routes/auth");
const privatePostRoute = require("./routes/PrivatePostRoute");

require('dotenv').config();

//Connect to DB
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB!");
  }
);

//Middlewares
app.use(express.json());

app.use("/api/user", authRoute);

app.use("/posts", privatePostRoute);

app.listen(3000, () => {
  console.log("Server up and running on 3000!");
});