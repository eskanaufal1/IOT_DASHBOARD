const mongoose = require("mongoose");

const realtimeDataSchema = new mongoose.Schema(
  {
    device: {
      type: String,
      required: [true, "Please add a device"],
    },
    state: {
      type: String,
      required: [true, "Please add a emergency state"],
    },
    longitude: {
      type: String,
      required: [true, "Please add a longitude"],
    },
    latitude: {
      type: String,
      required: [true, "Please add a latitude"],
    },
    speed: {
      type: String,
      required: [true, "Please add a speed"],
    },
    altitude: {
      type: String,
      required: [true, "Please add a altitude"],
    },
    created_by: {
      // email
      type: String,
      required: [true, "Please add a created_by"],
    },
    color: {
      type: String,
      required: [true, "Please add a color"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RealtimeData", realtimeDataSchema);
