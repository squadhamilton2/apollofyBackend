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
console.log({ multerCloudinaryImage });

const songRouter = Router();

songRouter.get("/", getAllSong);
songRouter.post("/:userId", multerCloudinaryImage.single("image"), createSong);
// songRouter.patch("/:songId", updateSong);
songRouter.delete("/:songId", deleteSong);

export default songRouter;
