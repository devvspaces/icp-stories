import { StableBTreeMap } from "azle";
import { Blog, Member, Post, Series, Comment } from "./types";

export const Members = StableBTreeMap<string, Member>(0);
export const UsernameIndex = StableBTreeMap<string, string>(0);

export const Blogs = StableBTreeMap<string, Blog>(0);
export const BSeries = StableBTreeMap<string, Series>(0);
export const Posts = StableBTreeMap<string, Post>(0);
export const Comments = StableBTreeMap<string, Comment[]>(0);
