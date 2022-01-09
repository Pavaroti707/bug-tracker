import express from "express";
import cachedUser from "../../../cache/cache";
import userController from "../controllers/user.controller";

const router = express.Router();

router.route("/api/users").get(userController.list);

router.route("/api/users/create").post(userController.create);

router
  .route("/api/cache/user")
  .get((req, res) => res.status(200).json(cachedUser));

export default router;
