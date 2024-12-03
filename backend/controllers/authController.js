const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("This is initial respon, test is working!");
};

const userLogin = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, password } = req.body;

    //check if user exist
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      console.log("User found", user);
    }
    // const hashedLoginPassword = await hashPassword(password);
    console.log(password, user.password);
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(400).json({ error: "Invalid credentials" });
    } else {
      console.log("User logged in", user);
      jwt.sign(
        {
          email: user.email,
          username: user.username,
          id: user._id,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          return res.cookie("token", token).json(user);
        }
      );
      // return res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const userRegister = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, password, email } = req.body;
    const hashedPassword = await hashPassword(password);
    //check if user exist
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      throw "User already exist";
    } else {
      const newUser = new User({
        email: email,
        username: username,
        password: hashedPassword,
      });
      await newUser
        .save()
        .then(() => {
          console.log("User saved");
        })
        .catch((error) => {
          console.log(error);
        });
      await res.status(200).json(newUser);
      console.log(newUser);
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  const { token } = req.cookies;
  console.log("profile route called");
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) throw err;
      res.json(user);
      // console.log("JWT Verified = ", user);
    });
  } else {
    res.json(null);
  }
};

const userLogout = async (req, res) => {
  try {
    await res.clearCookie("token").json({ message: "User logged out" });
    // await res.status(200).json({ message: "User logged out" });
    console.log("User logged out");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { test, userLogin, userRegister, getProfile, userLogout };
