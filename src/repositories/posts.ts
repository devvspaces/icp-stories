import { v4 as uuidv4 } from "uuid";
import { now } from "../helpers/date";
import { Comment, Post, PostStatus } from "../types";
import { Comments, Posts } from "../models";
import { BadRequestException, NotFoundException } from "../helpers/errors";
import {
  CreateCommentDto,
  CreatePostDto,
  UpdatePostDto,
} from "../validators/posts";
import MemberRepository from "./members";

export default class PostRepository {
  static list() {
    return Posts.values();
  }

  static listByBlog(id: string, status?: PostStatus) {
    return Posts.values().filter(
      (post) => post.blogId === id && (!status || post.status === status)
    );
  }

  static listByUserId(id: string, status?: PostStatus) {
    return Posts.values().filter(
      (post) => post.userId === id && (!status || post.status === status)
    );
  }

  static listBySeriesId(id: string) {
    return Posts.values().filter((post) => post.seriesId === id);
  }

  static create(userId: string, data: CreatePostDto) {
    MemberRepository.get(userId);
    const post: Post = {
      id: uuidv4(),
      userId,
      createdAt: now(),
      updatedAt: now(),
      ...data,
    };
    Posts.insert(post.id, post);
    return post;
  }

  static get(id: string) {
    const post = Posts.get(id);
    if ("None" in post) {
      throw new NotFoundException("Post not found");
    }
    const optComments = Comments.get(id);
    const comments = "None" in optComments ? [] : optComments.Some;
    return {
      ...post.Some,
      comments,
    };
  }

  static update(id: string, data: UpdatePostDto) {
    const post = Posts.get(id);
    if ("None" in post) {
      throw new NotFoundException("Post not found");
    }
    const updated = {
      ...post.Some,
      ...data,
      updatedAt: now(),
    };
    Posts.insert(updated.id, updated);
    return updated;
  }

  static addComment(userId: string, data: CreateCommentDto) {
    MemberRepository.get(userId);
    const post = Posts.get(data.postId);
    if ("None" in post) {
      throw new NotFoundException("Post not found");
    }
    if (post.Some.status !== "published") {
      throw new BadRequestException(
        "Cannot comment on a post that is not published"
      );
    }
    if (post.Some.comment_enabled === false) {
      throw new BadRequestException("Comments are disabled for this post");
    }
    const newComment: Comment = {
      id: uuidv4(),
      userId,
      createdAt: now(),
      ...data,
    };
    const comments = Comments.get(data.postId);
    const newComments =
      "None" in comments ? [newComment] : [...comments.Some, newComment];
    Comments.insert(data.postId, newComments);
    return newComment;
  }

  static deleteComment(postId: string, commentId: string) {
    const comments = Comments.get(postId);
    if ("None" in comments) {
      throw new NotFoundException("Post does not have any comments");
    }
    const newComments = comments.Some.filter(
      (comment) => comment.id !== commentId
    );
    if (newComments.length === comments.Some.length) {
      throw new NotFoundException("Comment not found");
    }
    Comments.insert(postId, newComments);
  }

  static delete(id: string) {
    const post = Posts.remove(id);
    if ("None" in post) {
      throw new NotFoundException("Post not found");
    }
    return post.Some;
  }
}
