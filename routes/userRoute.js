const { Router } = require("express");
require("dotenv").config();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const userData = await userModel.find();
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(403).json({ message: "User already registered" });
    }

    // hash the password
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const newUser = await userModel.create({
        username,
        email,
        password: hash,
      });

      res.status(201).json({ message: "user registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    // console.log(user);

    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        // result == false
        if (result) {
          const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.SECURITY_KEY
          );

          res
            .status(201)
            .json({ message: "User logged in successfully", token });
        } else {
          res.status.json({ message: "wrong password" });
        }
      });
    } else {
      res.status(500).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = userRouter;
