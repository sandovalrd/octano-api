"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _env_config = require("./env_config");

var _config = _interopRequireDefault(require("./db/config"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_express.default.static(_path.default.resolve(__dirname, "../public")));
app.use((0, _morgan.default)("dev"));
app.use((0, _cors.default)());
app.use("/api", _index.default);
app.listen(_env_config.PORT, () => {
  console.log(`server is listening on ${_env_config.PORT}`);
});