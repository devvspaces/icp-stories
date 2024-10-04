import express from "express";
import { validateSchema } from "../helpers/validate";
import * as controller from "../controllers/blog";
import { CreateBlogDto, UpdateBlogDto } from "../validators/blog";
const router = express.Router();

router.route("").get(
  controller.all
);
router.route(":id").get(
  controller.getBlog
);
router.route("/create/:userId").post(
  validateSchema(CreateBlogDto),
  controller.createBlog
);
router.route("/update/:id").patch(
  validateSchema(UpdateBlogDto),
  controller.updateBlog
);
router.route("/delete/:id").delete(
  controller.deleteBlog
);
router.route("/list/:userId").get(
  controller.listUserBlogs
);

export default router;
