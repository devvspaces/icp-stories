import MemberRepository from "../repositories/members";
import { withErrorHandling } from "../helpers/errorHandler";

export const createAccount = withErrorHandling(async (req, res) => {
  const member = MemberRepository.create(req.body);
  res.json(member);
});

export const getAccount = withErrorHandling(async (req, res) => {
  const member = MemberRepository.get(req.params.id);
  res.json(member);
});

export const listAccounts = withErrorHandling(async (req, res) => {
  const members = MemberRepository.list();
  res.json(members);
});

export const getAccountByUsername = withErrorHandling(async (req, res) => {
  const member = MemberRepository.getByUsername(req.params.username);
  res.json(member);
});

export const updateAccount = withErrorHandling(async (req, res) => {
  const member = MemberRepository.update(req.params.id, req.body);
  res.json(member);
});

export const deleteAccount = withErrorHandling(async (req, res) => {
  const member = MemberRepository.delete(req.params.id);
  res.json(member);
});
