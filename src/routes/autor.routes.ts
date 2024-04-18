import { Router } from "express";
import {
  getAutor,
  createAutor,
  updateAutor,
  deleteAutor
} from "../controllers/autor.controllers";

const autorRouter = Router();

autorRouter.get("/:userId", getAutor);
autorRouter.post("/", createAutor);
autorRouter.patch("/:userId", updateAutor);
autorRouter.delete("/:userId", deleteAutor);

export default autorRouter;
