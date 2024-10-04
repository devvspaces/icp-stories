import express from "express";
import { validateSchema } from "../helpers/validate";
import { CreateMemberDto, UpdateMemberDto } from "../validators/auth";
import * as controller from "../controllers/user";
const UserRouter = express.Router();

UserRouter.route("/account/list").get(controller.listAccounts);
UserRouter.route("/register").post(
  validateSchema(CreateMemberDto),
  controller.createAccount
);
UserRouter.route("/account/:id")
  .get(controller.getAccount)
  .patch(validateSchema(UpdateMemberDto), controller.updateAccount)
  .delete(controller.deleteAccount);
UserRouter.route("/account/by-username/:username").get(
  controller.getAccountByUsername
);

export default UserRouter;
