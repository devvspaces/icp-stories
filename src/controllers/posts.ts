import { withErrorHandling } from "../helpers/errorHandler";
import PostRepository from "../repositories/posts";

export const createPost = withErrorHandling(async (req, res) => {
  res.json(PostRepository.create(req.params.userId, req.body));
});

export const getPost = withErrorHandling(async (req, res) => {
  res.json(PostRepository.get(req.params.id));
});

export const all = withErrorHandling(async (req, res) => {
  res.json(PostRepository.list());
});

export const deletePost = withErrorHandling(async (req, res) => {
  res.json(PostRepository.delete(req.params.id));
});

export const updatePost = withErrorHandling(async (req, res) => {
  res.json(PostRepository.update(req.params.id, req.body));
});

export const listUserPosts = withErrorHandling(async (req, res) => {
  res.json(PostRepository.listByUserId(req.params.userId));
});

export const listBlogPosts = withErrorHandling(async (req, res) => {
  res.json(PostRepository.listByBlog(req.params.blogId));
});

export const listSeriesPosts = withErrorHandling(async (req, res) => {
  res.json(PostRepository.listBySeriesId(req.params.seriesId));
});

export const addComment = withErrorHandling(async (req, res) => {
  res.json(PostRepository.addComment(req.params.userId, req.body));
});

export const deleteComment = withErrorHandling(async (req, res) => {
  res.json(PostRepository.deleteComment(req.params.postId, req.params.commentId));
});
