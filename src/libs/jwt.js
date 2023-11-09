import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, "");
};
