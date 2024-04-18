import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controllers";

const userRouter = Router();

userRouter.get("/:userId", getUser);
userRouter.post("/", createUser);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);

export default userRouter;
