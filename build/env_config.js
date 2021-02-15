"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PassWord = exports.seedToken = exports.mongoURI = exports.PORT = void 0;

require("dotenv").config();

const PORT = Number(process.env.PORT) || 3000;
exports.PORT = PORT;
const mongoURI = process.env.mongoURI || "";
exports.mongoURI = mongoURI;
const PassWord = Number(process.env.password) || 123456;
exports.PassWord = PassWord;
const seedToken = process.env.seedToken || "sdlfjalsadjkfñqncwruqiwrcniquccndsjkfsojncwjeqñljsdufñurliiou0834hshf";
exports.seedToken = seedToken;