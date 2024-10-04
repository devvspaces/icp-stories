import { withErrorHandling } from "../helpers/errorHandler";
import BlogRepository from "../repositories/blog";

export const createBlog = withErrorHandling(async (req, res) => {
  res.json(BlogRepository.create(req.params.userId, req.body));
});

export const getBlog = withErrorHandling(async (req, res) => {
  res.json(BlogRepository.get(req.params.id));
});

export const all = withErrorHandling(async (req, res) => {
  res.json(BlogRepository.list());
});

export const deleteBlog = withErrorHandling(async (req, res) => {
  res.json(BlogRepository.delete(req.params.id));
});

export const updateBlog = withErrorHandling(async (req, res) => {
  res.json(BlogRepository.update(req.params.id, req.body));
});

export const listUserBlogs = withErrorHandling(async (req, res) => {
  res.json(BlogRepository.listForUser(req.params.userId));
});
