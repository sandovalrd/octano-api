import mongoose from "mongoose";
import { mongoURI } from "../env_config";

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose.connect(
      mongoURI,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
      (req, res) => {
        if (req) {
          console.log("Database OFFLINE");
        } else {
          console.log("Database ONLINE");
        }
      }
    );
  }
}

export default new Database();
