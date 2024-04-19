import { Request, Response } from "express";
import PlaylistModel from "../models/playlist.model";

export const createPlaylist = async (req: Request, res: Response) => {
    const { songs, publicAccess, owner, writers, readers } = req.body;
  
    try {
      const newPlaylist = await PlaylistModel.create({ songs, publicAccess, owner, writers, readers });
      res.status(201).send(newPlaylist);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  export const deletePlaylist = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const playlistDeleted = await PlaylistModel.findByIdAndDelete({ _id: userId });
      res.status(200).send(playlistDeleted);
    } catch (error) {
      res.status(400).send(error);
    }
  };