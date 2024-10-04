import { v4 as uuidv4 } from "uuid";
import { CreateMemberDto, UpdateMemberDto } from "../validators/auth";
import { now } from "../helpers/date";
import { Member } from "../types";
import { Members, UsernameIndex } from "../models";
import { ConflictException, NotFoundException } from "../helpers/errors";

export default class MemberRepository {
  static create(member: CreateMemberDto) {
    // Validate username uniqueness
    const existingMember = UsernameIndex.get(member.username);
    if ("Some" in existingMember) {
      throw new ConflictException("Username already exists");
    }
    const user: Member = {
      id: uuidv4(),
      createdAt: now(),
      blogs: [],
      ...member,
    };
    Members.insert(user.id, user);

    // Index the username
    UsernameIndex.insert(user.username, user.id);

    return user;
  }

  static get(id: string) {
    const user = Members.get(id);
    if ("None" in user) {
      throw new NotFoundException("Member not found");
    }
    return user.Some;
  }

  static getByUsername(username: string) {
    const id = UsernameIndex.get(username);
    if ("None" in id) {
      throw new NotFoundException("Member not found");
    }
    return MemberRepository.get(id.Some);
  }

  static list() {
    return Members.values();
  }

  static update(id: string, member: UpdateMemberDto) {
    const existingMember = Members.get(id);
    if ("None" in existingMember) {
      throw new Error("Member not found");
    }

    const user = {
      ...existingMember.Some,
      ...member,
      updatedAt: now(),
    };
    Members.insert(user.id, user);

    return user;
  }

  static delete(id: string) {
    const existingMember = Members.remove(id);
    if ("None" in existingMember) {
      throw new Error("Member not found");
    }

    return existingMember.Some;
  }
}
