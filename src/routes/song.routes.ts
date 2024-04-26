import { Router } from "express";
import {
    createSong,
    deleteSong,
    getAllSong,
    // updateSong,

} from "../controllers/song.controllers";
import { multerCloudinaryImage, multerCloudinarySong } from "../utils/multer-cloudinary";



const songRouter = Router();

songRouter.get("/", getAllSong);
songRouter.post("/:userId", multerCloudinarySong.single("songUrl"), createSong);
// songRouter.patch("/:songId", updateSong);
songRouter.delete("/:songId", deleteSong);

export default songRouter;
