export default (req, res, next) => {
  const { move_id, move, skills, skills_id } = req.body;
  if (
    move_id === undefined ||
    skills_id === undefined ||
    move === undefined ||
    skills === undefined
  ) {
    return res.status(400).send({
      status: "error",
      message: "missing parameters!",
    });
  }
  if (skills_id === move_id) {
    return res.status(400).send({
      status: "error",
      message: "Config not allow!",
    });
  }
  next();
};
