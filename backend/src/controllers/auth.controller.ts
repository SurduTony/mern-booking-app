import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import User from "../models/user.model";
import generateTokenAndSetCookie from "../lib/utils/generateToken";

export const Login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array() });
    return;
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    generateTokenAndSetCookie(user.id, res);

    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log("Error in /auth/login: " + error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const Logout = (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    maxAge: 0,
  });
  res.send();
};
