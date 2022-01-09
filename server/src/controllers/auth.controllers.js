import User from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "./../config/config";
import cachedUser from "../../../cache/cache";

const signin = (req, res) => {
  User.findOne({ name: req.body.name }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match" });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    res.cookie("t", token, { expire: new Date() + 9999 });

    cachedUser._id = user._id;
    cachedUser.id = user.id;
    cachedUser.name = user.name;
    cachedUser.role = user.role;

    return res.status(200).json(token);
  });
};

const signout = (req, res) => {
  res.clearCookie("t");

  cachedUser._id = "";
  cachedUser.id = "";
  cachedUser.name = "";
  cachedUser.role = "";

  return res.status(200).json({ message: "signed out" });
};

export default { signin, signout };
