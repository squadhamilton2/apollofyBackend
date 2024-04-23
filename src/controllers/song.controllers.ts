import { Request, Response } from "express";
import UserModel from "../models/song.model";

export const getAllSong = async (req: Request, res: Response) => {
  try {
    const allSongs = await UserModel.find();
    res.status(200).send({
        data: allSongs,
        msg: "Here are your songs!"
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createSong = async (req: Request, res: Response) => {
  const { name, songUrl, length, autorId, albumId, genreId } = req.body;

  try {
    const newSong = await UserModel.create({ name, songUrl, length, autorId, albumId, genreId });
    res.status(201).send({
        data: newSong,
        msg: "New song created"});
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
    res.status(201).send({
        data: songUpdated,
        msg: "Song updated"});
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const deleteSong = async (req: Request, res: Response) => {
  const { songId } = req.params;
  try {
    const songDeleted = await UserModel.findByIdAndDelete({ _id: songId });
    res.status(200).send({
        data: songDeleted,
        msg: "Song deleted"});
  } catch (error) {
    res.status(400).send(error);
  }
};
