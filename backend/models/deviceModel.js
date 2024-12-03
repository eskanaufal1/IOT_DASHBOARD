const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    device: {
      type: String,
      required: [true, "Please add a device"],
    },
    description: {
      type: String,
    },
    color: {
      type: String,
      required: [true, "Please add a color"],
    },
    topic: {
      type: String,
      required: [true, "Please add a topic"],
    },
    created_by: {
      // email
      type: String,
      required: [true, "Please add a created_by"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);
