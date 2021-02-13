import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { PORT } from "./env_config";
import Database from "../server/db/config";
import index_routes from "./routes/index";

const app = express();

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(morgan("dev"));
app.use(cors());

app.use("/api", index_routes);

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
