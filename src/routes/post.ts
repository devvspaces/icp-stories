import express from "express";
import { validateSchema } from "../helpers/validate";
import * as controller from "../controllers/posts";
import {
  CreateCommentDto,
  CreatePostDto,
  UpdatePostDto,
} from "../validators/posts";
const router = express.Router();

router.route("").get(controller.all);
router
  .route("/create/:userId")
  .post(validateSchema(CreatePostDto), controller.createPost);
router
  .route("/:id")
  .get(controller.getPost)
  .patch(validateSchema(UpdatePostDto), controller.updatePost)
  .delete(controller.deletePost);
router
  .route("/:userId/comment")
  .post(validateSchema(CreateCommentDto), controller.addComment);
router.route("/:postId/comment/:commentId").delete(controller.deleteComment);
router.route("/user/:userId").get(controller.listUserPosts);
router.route("/blog/:blogId").get(controller.listBlogPosts);
router.route("/series/:seriesId").get(controller.listSeriesPosts);

export default router;
