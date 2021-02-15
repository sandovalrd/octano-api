require("dotenv").config();
const PORT = Number(process.env.PORT) || 3000;
const mongoURI = process.env.mongoURI || "";
const PassWord = Number(process.env.password) || 123456;
const seedToken =
  process.env.seedToken ||
  "sdlfjalsadjkfñqncwruqiwrcniquccndsjkfsojncwjeqñljsdufñurliiou0834hshf";

export { PORT, mongoURI, seedToken, PassWord };
