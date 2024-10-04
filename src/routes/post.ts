import express from "express";
import { validateSchema } from "../helpers/validate";
import * as controller from "../controllers/posts";
import { CreateCommentDto, CreatePostDto, UpdatePostDto } from "../validators/posts";
const router = express.Router();

router.route("").get(
  controller.all
);
router.route(":id").get(
  controller.getPost
);
router.route(":id/comment").post(
  validateSchema(CreateCommentDto),
  controller.addComment
);
router.route(":id/comment/:commentId").delete(
  controller.deleteComment
);
router.route("/create/:userId").post(
  validateSchema(CreatePostDto),
  controller.createPost
);
router.route("/update/:id").patch(
  validateSchema(UpdatePostDto),
  controller.updatePost
);
router.route("/delete/:id").delete(
  controller.deletePost
);
router.route("/list/:userId").get(
  controller.listUserPosts
);
router.route("/list/:blogId").get(
  controller.listBlogPosts
);
router.route("/list/:seriesId").get(
  controller.listSeriesPosts
);

export default router;
