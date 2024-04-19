import { Router } from "express";
import { createPlaylist, deletePlaylist } from "../controllers/playlist.controllers";

const playlistRouter = Router();

// userRouter.get("/:userId", getPlaylist);
playlistRouter.post("/", createPlaylist);
// userRouter.patch("/:userId", updatePlaylist);
playlistRouter.delete("/:userId", deletePlaylist);

export default playlistRouter;
