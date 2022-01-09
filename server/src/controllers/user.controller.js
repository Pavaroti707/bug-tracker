import User from "../models/user.model";
import errorHandler from "../helpers/dbErrorHandler";

const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user;
    next();
  });
};

const create = async(req, res, next) => {
  let id;

  await User.find((err, users) => {
    id = users.length + 1;
  });

  const user = new User({
    id: id,
    name: req.body.name,
    password: req.body.password,
    role: req.body.role,
  });

  user.save((err, result) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }

    res.status(200).json(user);
  });
};

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.json(users);
  }).select("_id id name role");
};

const read = (req, res) => {
  res.status(200).json(req.profile);
};

export default { create, list, userByID, read };
