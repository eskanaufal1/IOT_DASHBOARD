const client = require("../mqtt_engine/mqttCore");
const Device = require("../models/deviceModel");
const getHelpDevice = (req, res) => {
  const { device } = req.body;
  Device.findOne({ device: device }).then((device) => {
    console.log("device helped = ", device.device);
    if (device) {
      client.publish(
        "unpam_gps_tracker/led",
        JSON.stringify({ message: "help" })
      );
    }
  });
  //   client.publish("unpam_gps_tracker/led", "help");
  console.log("help received");
  res.status(200).json({ message: "get help device" });
};

module.exports = getHelpDevice;
