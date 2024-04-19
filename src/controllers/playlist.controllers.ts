import { Request, Response } from "express";
import PlaylistModel from "../models/playlist.model";

export const getPlaylist = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const playlist = await PlaylistModel.findById(userId); 
    
    if (!playlist) { 
      return res.status(404).send("Playlist no encontrada");
    }
    
    res.status(200).send(playlist); 
   } catch (error) { 
    res.status(500).send(error);
  }
};

export const createPlaylist = async (req: Request, res: Response) => {
    const { songs, publicAccess, owner, writers, readers } = req.body;
  
    try {
      const newPlaylist = await PlaylistModel.create({ songs, publicAccess, owner, writers, readers });
      res.status(201).send(newPlaylist);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  export const updatePlaylist = async (req: Request, res: Response) => {
    const { songs, publicAccess, owner, writers, readers } = req.body;
    const { userId } = req.params;
  
    try {
      const playlistUpdated = await PlaylistModel.findByIdAndUpdate(
        { _id: userId },
        { songs, publicAccess, owner, writers, readers },
        { new: true }
      );
      res.status(201).send(playlistUpdated);
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
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