"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (req, res, next) => {
  if (!req.body.allow_delete) {
    return res.status(401).send({
      status: "error",
      message: "Delete not allowed"
    });
  }

  next();
};

exports.default = _default;