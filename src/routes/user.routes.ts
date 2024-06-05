import { Router } from "express";
import {
  // createUser,
  // deleteUser,
  getAllUser,
  // updateUser,
  // getUserById
} from "../controllers/user.controllers";

const userRouter = Router();

userRouter.get("/", getAllUser);
// userRouter.get("/:userId", getUserById);
// userRouter.post("/", createUser);
// userRouter.patch("/:userId", updateUser);
// userRouter.delete("/:userId", deleteUser);

export default userRouter;
