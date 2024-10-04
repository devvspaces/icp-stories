import express from "express";
import { validateSchema } from "../helpers/validate";
import * as controller from "../controllers/series";
import { CreateSeriesDto, UpdateSeriesDto } from "../validators/series";
const router = express.Router();

router.route("").get(
  controller.all
);
router.route(":id").get(
  controller.getSeries
);
router.route("/create/:userId").post(
  validateSchema(CreateSeriesDto),
  controller.createSeries
);
router.route("/update/:id").patch(
  validateSchema(UpdateSeriesDto),
  controller.updateSeries
);
router.route("/delete/:id").delete(
  controller.deleteSeries
);
router.route("/list/:userId").get(
  controller.listUserSeries
);
router.route("/list/:blogId").get(
  controller.listBlogSeries
);

export default router;
