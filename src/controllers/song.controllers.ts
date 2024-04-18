import { Request, Response } from "express";
import UserModel from "../models/song.model";

export const getAllSong = async (req: Request, res: Response) => {
  try {
    const allSongs = await UserModel.find();
    res.status(200).send(allSongs);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createSong = async (req: Request, res: Response) => {
  const { name, songUrl, length, autorId, albumId, genreId } = req.body;

  try {
    const newUser = await UserModel.create({ name, songUrl, length, autorId, albumId, genreId });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateSong = async (req: Request, res: Response) => {
  const { name, songUrl, length, autorId, albumId, genreId } = req.body;
  const { songId } = req.params;

  try {
    const songUpdated = await UserModel.findByIdAndUpdate(
      { _id: songId },
      { name, songUrl, length, autorId, albumId, genreId },
      { new: true }
    );
    res.status(201).send(songUpdated);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const deleteSong = async (req: Request, res: Response) => {
  const { songId } = req.params;
  try {
    const songDeleted = await UserModel.findByIdAndDelete({ _id: songId });
    res.status(200).send(songDeleted);
  } catch (error) {
    res.status(400).send(error);
  }
};
