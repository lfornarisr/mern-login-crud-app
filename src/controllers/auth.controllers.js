import { generateToken } from "../libs/jwt.js";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const login = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await userModel.findOne({ username });

  if (!userExists) return res.status(403).send({ message: "User not found" });
  else {
    const passwordMatch = await bcryptjs.compare(password, userExists.password);
    if (passwordMatch)
      return res
        .cookie("token", generateToken({ id: userExists._id }))
        .json({ message: "Login successfull!!!" });
    else return res.status(400).json({ message: "Incorrect password!!!" });
  }
};

export const register = async (req, res) => {
  const { username, email, password } = await req.body;

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
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await userModel.findById(req.user.id);
  if (!userFound) {
    return res.status(400).json({ message: "User not fund" });
  }

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};
