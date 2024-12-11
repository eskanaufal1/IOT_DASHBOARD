const express = require("express");
const router = express.Router();
const cors = require("cors");
const { getRealtimeData } = require("../controllers/realtimeController");
const {
  addDevice,
  getDevices,
  deleteDevice,
} = require("../controllers/deviceController");
const {
  test,
  userRegister,
  userLogin,
  getProfile,
  userLogout,
} = require("../controllers/authController");
const getHelpDevice = require("../controllers/getHelpDevice");

//middleware
router.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

router.get("/", test);

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/profile", getProfile);

router.get("/logout", userLogout);

router.post("/adddevice", addDevice);

router.post("/devices", getDevices);

router.post("/getlatestdata", getRealtimeData);

router.post("/help", getHelpDevice);

router.post("/uploads", (req, res) => {
  console.log(req);
});

router.delete("/devices", deleteDevice);

module.exports = router;
