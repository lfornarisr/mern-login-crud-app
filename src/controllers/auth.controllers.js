import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const login = (req, res) => {
  console.log(req.body);
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const passwordHash = await bcryptjs.hash(password, 10);

  try {
    const newUser = new userModel({
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email:userSaved.email,
      createdAt:userSaved.createdAt,
      updatedAt:userSaved.updatedAt
    });
  } catch (error) {
    console.log(error);
  }
};
