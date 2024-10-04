import { StableBTreeMap } from "azle";
import { Blog, Member, Post, Series, Comment } from "./types";

export const Members = StableBTreeMap<string, Member>(0);
export const UsernameIndex = StableBTreeMap<string, string>(1);

export const Blogs = StableBTreeMap<string, Blog>(2);
export const BSeries = StableBTreeMap<string, Series>(3);
export const Posts = StableBTreeMap<string, Post>(4);
export const Comments = StableBTreeMap<string, Comment[]>(5);
