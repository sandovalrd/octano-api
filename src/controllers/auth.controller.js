import jwt from "jsonwebtoken";
import { seedToken, PassWord } from "../env_config";

export default class AuthController {
  authToken(req, res) {
    const { password } = req.body;

    if (password === undefined) {
      return res.status(400).send({
        status: "Error",
        message: "Missing parameters!",
      });
    }

    if (password !== PassWord) {
      return res.status(400).send({
        status: "error",
        message: "Invalid credentials!",
      });
    }

    const tokenData = {
      sub: "1234567890",
      name: "Octano Sotfware",
      admin: true,
    };

    const token = jwt.sign(tokenData, seedToken, {
      expiresIn: 60 * 60 * 24, // expires in 24 hours
    });

    return res.send({
      status: "Ok",
      token: token,
    });
  }
}
