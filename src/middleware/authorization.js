import jwt from "jsonwebtoken";
import { seedToken } from "../env_config";

export default (req, res, next) => {
  const token = req.get("Authorization");

  jwt.verify(token, seedToken, (err, user) => {
    if (err) {
      return res.status(401).send({
        status: "error",
        message: err.message,
      });
    }
    req.usuario = user;
    next();
  });
};
