import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ message: "No token" });
  } else {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  }
};
