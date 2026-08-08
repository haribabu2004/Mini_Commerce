import User from "../models/UserAuth.model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Please Enter all details" });
  }

  const userAvail = await User.findOne({ email });

  if (userAvail) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists, Please login" });
  }

  const hashedPass = await bcrypt.hash(password, 10);
  const user = await User.create({
    username: username,
    email: email,
    password: hashedPass,
  });

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("Can't create user");
  }
});

export const Login = asyncHandler(async (req, res) => {
    const {email,password} = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All feilds are mandatory" });
      throw new Error("All feilds are mandatory");
    }

    const user = await User.findOne({email})

    if(!user){
        res.status(400).json({ message: "User not found" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const usertoken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      console.log({ message: `user login successful` });
      res.status(200).json({
        message: "Login successful",
        token: usertoken,
        userId: user._id,
      });
    } else {
      res.status(401);
      throw new Error("email or password is not valid");
    }
});
