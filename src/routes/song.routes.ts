import { Router } from "express";
import {
  createSong,
  deleteSong,
  getAllSong,
  // updateSong,
} from "../controllers/song.controllers";
import {
  multerCloudinarySong,
  multerCloudinaryImage,
} from "../utils/multer-cloudinary";

const songRouter = Router();

songRouter.get("/", getAllSong);
songRouter.post("/:userId", multerCloudinarySong.single("songUrl"), createSong);
songRouter.post("/:userId", multerCloudinarySong.single("songUrl"), createSong);
// songRouter.patch("/:songId", updateSong);
songRouter.delete("/:songId", deleteSong);

export default songRouter;
