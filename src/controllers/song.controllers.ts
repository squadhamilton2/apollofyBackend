import { Request, Response } from "express";
import SongModel from "../models/song.model";
import { deleteSongFromCloudinary, getPublicId, uploadSongToCloudinary } from "../utils/cloudinary";
import { Multer } from "multer"

export const getAllSong = async (req: Request, res: Response) => {
  try {
    const allSongs = await SongModel.find();
    res.status(200).send({
        data: allSongs,
        msg: "Here are your songs!"
    });
    res.json(allSongs)
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createSong = async (req: Request, res: Response) => {
  console.log("entro en createSong");

  const { name, length } = req.body;
  const song = req.file?.path;

  const userId = req.params.userId;
  console.log({ userId });

  if (!name) {
      return res.status(400).send({ message: "The field name is required" });
  }

  if (!song) {
      return res.status(400).send({ message: "The field songUrl is required" });
  }

  if (!length) {
      return res.status(400).send({ message: "The field length is required" });
  }

  
  const songUploadedToCloudinary = await uploadSongToCloudinary(song);
  console.log({ songUploadedToCloudinary });

  try {

    const newSong = new SongModel({
        name: name,
        songUrl: songUploadedToCloudinary,
        length: length,
    });

    const savedSong = await newSong.save();

  
    const song = await SongModel.findById(savedSong._id).populate('genres');

    res.status(201).send({
        msg: "Song created successfully",
        data: song,
        typeof: typeof song,
    });
} catch (error) {
    res.status(400).send(error);
}
};


// export const updateSong = async (req: Request, res: Response) => {
//   const { name, songUrl, length, autorId, albumId, genreId } = req.body;
//   const { songId } = req.params;

//   try {
//     const songUpdated = await SongModel.findByIdAndUpdate(
//       { _id: songId },
//       { name, songUrl, length, autorId, albumId, genreId },
//       { new: true }
//     );
//     res.status(201).send({
//         data: songUpdated,
//         msg: "Song updated"});
//   } catch (error) {
//     res.status(400).send(error);
//     console.log(error);
//   }
// };

export const deleteSong = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
      return res.status(400).send({ message: "The field id is required" });
  }

  try {
      const song = await SongModel.findByIdAndDelete(id);

      if (!song) {
          return res.status(404).send({ message: "Song not found" });
      }

      deleteSongFromCloudinary(getPublicId(song.songUrl));

      res.status(200).send(song);
  } catch (error) {
      res.status(500).send({ message: "Internal server error" });
  }
};

