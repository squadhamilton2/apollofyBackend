import { Router } from "express";
import {
    createSong,
    deleteSong,
    getAllSong,
    updateSong,

} from "../controllers/song.controllers";


const songRouter = Router();

songRouter.get("/", getAllSong);
songRouter.post("/", createSong);
songRouter.patch("/:songId", updateSong);
songRouter.delete("/:songId", deleteSong);

export default songRouter;
