import express from "express";
import bugController from "../controllers/bug.controller";

const router = express.Router();

router.route("/api/bugs").get(bugController.list);

router.route("/api/bugs/create").post(bugController.create);

router.param("bugId", bugController.bugById);

router
  .route("/api/bugs/:bugId")
  .get(bugController.read)
  .put(bugController.update)
  .delete(bugController.remove);

export default router;
