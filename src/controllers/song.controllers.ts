import { Request, Response } from "express";
import fs from "fs-extra";
import SongModel from "../models/song.model";
import {
  deleteAudioCloudinary,
  deleteImageCloudinary,
  uploadAudioCloudinary,
  uploadImageCloudinary,
} from "../utils/cloudinary";

export const getAllSong = async (req: Request, res: Response) => {
  try {
    const allSongs = await SongModel.find();
    res.status(200).send({
      data: allSongs,
      msg: "Here are your songs!",
    });
    res.json(allSongs);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createSong = async (req: Request, res: Response) => {
  const { name } = req.body;
  const imageUrl = req.files?.imageUrl;
  const songUrl = req.files?.songUrl;
  const { userId } = req.params;

  if (!name || !imageUrl || !songUrl) {
    return res
      .status(400)
      .send("The fields name, songUrl, imageUrl are required");
  }

  try {
    if (Array.isArray(imageUrl) || Array.isArray(songUrl)) {
      return res.status(400).json({
        msg: "You can only upload one file per track.",
      });
    } else {
      const resultImageUrl = await uploadImageCloudinary(imageUrl.tempFilePath);
      const resultSongUrl = await uploadAudioCloudinary(songUrl.tempFilePath);

      const newSong = new SongModel({
        name,
        songUrl: resultSongUrl.secure_url,
        public_id_songUrl: resultSongUrl.public_id,
        // duration: resultUrl.duration,
        user: userId,
        imageUrl: resultImageUrl.secure_url,
        public_id_imageUrl: resultImageUrl.public_id,
        // genres: genresId,
        // artist: artistId,
        // album: albumId || null,
      });

      await newSong.save();

      await fs.unlink(imageUrl.tempFilePath);
      await fs.unlink(songUrl.tempFilePath);

      return res.status(201).send({
        msg: `New song has been created successfully`,
        data: newSong,
      });
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

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

    await deleteImageCloudinary(song.public_id_imageUrl);
    await deleteAudioCloudinary(song.public_id_songUrl);

    res.status(200).send(song);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};
