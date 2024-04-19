import { Router } from "express";
import {

    createAlbum,
  deleteAlbum,
  getAlbum,
  updateAlbum,
 
} from "../controllers/album.controllers";

const albumRouter = Router();

albumRouter.get("/:albumId", getAlbum);
albumRouter.post("/", createAlbum);
albumRouter.patch("/:albumId", updateAlbum);
albumRouter.delete("/:albumId", deleteAlbum);

export default albumRouter;
