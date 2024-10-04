import { v4 as uuidv4 } from "uuid";
import { now } from "../helpers/date";
import { Blog } from "../types";
import { Blogs } from "../models";
import { NotFoundException } from "../helpers/errors";
import { CreateBlogDto, UpdateBlogDto } from "../validators/blog";

export default class BlogRepository {

  static list() {
    return Blogs.values();
  }

  static listForUser(userId: string) {
    return Blogs.values().filter(blog => blog.userId === userId);
  }

  static create(userId: string, data: CreateBlogDto) {
    const { socials } = data;
    const blog: Blog = {
      id: uuidv4(),
      userId,
      createdAt: now(),
      updatedAt: now(),
      series: [],
      posts: [],
      socials: socials || {},
      ...data,
    };
    Blogs.insert(blog.id, blog);
    return blog;
  }

  static get(id: string) {
    const blog = Blogs.get(id);
    if ("None" in blog) {
      throw new NotFoundException("Blog not found");
    }
    return blog.Some;
  }

  static update(id: string, data: UpdateBlogDto) {
    const blog = Blogs.get(id);
    if ("None" in blog) {
      throw new NotFoundException("Blog not found");
    }
    const updatedBlog = {
      ...blog.Some,
      ...data,
      updatedAt: now(),
    };
    Blogs.insert(updatedBlog.id, updatedBlog);
    return updatedBlog;
  }

  static delete(id: string) {
    const blog = Blogs.remove(id);
    if ("None" in blog) {
      throw new NotFoundException("Blog not found");
    }
    return blog.Some;
  }
}
