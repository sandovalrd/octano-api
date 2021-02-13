export default (req, res, next) => {
  if (!req.body.allow_delete) {
    return res.status(401).send({
      status: "error",
      message: "Delete not allowed",
    });
  }
  next();
};
