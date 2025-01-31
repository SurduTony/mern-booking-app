import { Request, Response } from "express";
import { validationResult } from "express-validator";

import User from "../models/user.model";
import generateTokenAndSetCookie from "../lib/utils/generateToken";

export const getMe = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array() });
    return;
  }

  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    user = new User(req.body);
    await user.save();

    generateTokenAndSetCookie(user.id, res);

    res.status(200).send({ message: "User registered OK" });
  } catch (error) {
    console.log("Error in /register: " + error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
