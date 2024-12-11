const Device = require("../models/deviceModel");

const addDevice = async (req, res) => {
  try {
    console.log(req.body);
    const { device, description, color, topic, created_by } = req.body;

    const newDevice = new Device({
      device: device,
      description: description,
      color: color,
      topic: topic,
      created_by: created_by,
    });
    await newDevice
      .save()
      .then(() => {
        console.log("Device saved");
      })
      .catch((error) => {
        console.log(error);
      });
    await res.status(200).json(newDevice);
    console.log(newDevice);
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

const getDevices = async (req, res) => {
  try {
    const { created_by } = req.body;
    const devices = await Device.find({
      created_by: created_by,
    }).sort({ createdAt: -1 });
    await res.status(200).json(devices);
    // console.log("get devices success");
    // console.log(devices);
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

const deleteDevice = async (req, res) => {
  try {
    const { device, _id } = req.body;
    const result = await Device.findByIdAndDelete(_id); // Menghapus berdasarkan ID
    if (!result) {
      console.log("Data tidak ditemukan");
      return res.status(404).send("Data tidak ditemukan");
    }
    console.log("Data berhasil dihapus");
    res.status(200).send("Data berhasil dihapus");
  } catch (err) {
    res.status(500).send("Terjadi kesalahan saat menghapus data");
    console.log(err);
  }
};

module.exports = { addDevice, getDevices, deleteDevice };
