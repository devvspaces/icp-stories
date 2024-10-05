import express from "express";
import { validateSchema } from "../helpers/validate";
import * as controller from "../controllers/series";
import { CreateSeriesDto, UpdateSeriesDto } from "../validators/series";
const router = express.Router();

router.route("").get(controller.all);
router
  .route("/create/:userId")
  .post(validateSchema(CreateSeriesDto), controller.createSeries);
router
  .route("/:id")
  .get(controller.getSeries)
  .patch(validateSchema(UpdateSeriesDto), controller.updateSeries)
  .delete(controller.deleteSeries);
router.route("/list/user/:userId").get(controller.listUserSeries);
router.route("/list/blog/:blogId").get(controller.listBlogSeries);

export default router;
