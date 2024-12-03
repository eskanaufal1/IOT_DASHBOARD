const mqtt = require("mqtt");
const protocol = "mqtt";
const host = "dimasalifta.tech";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const Device = require("../models/deviceModel");
const RealtimeData = require("../models/realtimeDataModel");
const connectUrl = `${protocol}://${host}:${port}`;

const checkDevice = async (device_id) => {
  const device = await Device.findOne({ device: device_id });
  return device;
};

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

const topic1 = "unpam_gps_tracker/ping";
const topic2 = "unpam_gps_tracker/pong";

client.on("connect", () => {
  console.log("Connected");
  client.subscribe([topic1, topic2], () => {
    console.log(`Subscribe to topic '${topic1}'`);
    console.log(`Subscribe to topic '${topic2}'`);
  });
});

client.on("message", async (topic, payload) => {
  const payloadStr = payload.toString();
  console.log("Payload (as string):", topic, payloadStr);
  try {
    const payloadObj = JSON.parse(payloadStr);
    console.log("Payload (as object):", payloadObj);
    if (
      payloadObj.device_id &&
      payloadObj.latitude &&
      payloadObj.longitude &&
      payloadObj.altitude_m &&
      payloadObj.speed_kmph
    ) {
      console.log(payloadObj.device_id);
      //   console.log(checkDevice(payloadObj.device_id));
      await checkDevice(payloadObj.device_id)
        .then((res) => {
          console.log(res);
          if (res) {
            const newRealtimeData = new RealtimeData({
              device: payloadObj.device_id,
              state: payloadObj.emergency_state,
              latitude: payloadObj.latitude,
              longitude: payloadObj.longitude,
              altitude: payloadObj.altitude_m,
              speed: payloadObj.speed_kmph,
              created_by: res.created_by,
              color: res.color,
            });
            newRealtimeData
              .save()
              .then(() => {
                console.log("RealtimeData saved");
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // console.log(payloadObj.speed_kmph);

    // Access data from the object (example)
    if (payloadObj && payloadObj.key) {
      console.log("Data from object:", payloadObj.key);
    }
  } catch (e) {
    console.log("Failed to parse JSON payload");
  }
});

module.exports = client;
