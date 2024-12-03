const express = require("express");
const app = express();
const io = require("./socket_modules/socketCore");
const routes = require("./routes/Routes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const client = require("./mqtt_engine/mqttCore");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// middleware
app.use("/", routes);

const appPort = 3000;
app.listen(appPort, () => {
  console.log("Node Server is running on port ", appPort);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const socketPort = 3001;
io.listen(socketPort);

client.on("connect", () => {
  console.log("Connected to MQTT Broker");
});
