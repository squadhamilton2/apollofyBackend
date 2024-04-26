import { Request, Response } from "express";
import AlbumModel from "../models/album.model";

export const getAlbum = async (req: Request, res: Response) => {
    try {
      const { albumId } = req.params;
      const album = await AlbumModel.findById(albumId); 
      
      if (!album) { 
        return res.status(404).send("Album no encontrado");
      }
      
      res.status(200).send({
            data: album,
            msg: "Here are your albums!"
        }); 
     } catch (error) { 
      res.status(500).send(error);
    }
  };
  
  
  export const createAlbum = async (req: Request, res: Response) => {
    const { name, description, thumbnail, length, autorId, songs, publishedAt } = req.body;
  
    try {
      const newAlbum = await AlbumModel.create({ name, description, thumbnail, length, autorId, songs, publishedAt });
      res.status(201).send({
            data: newAlbum,
            msg: "New album created"
        });
    } catch (error) {
      res.status(400).send(error);
    }
  };
  

  
  export const deleteAlbum = async (req: Request, res: Response) => {
    const { albumId } = req.params;
    try {
      const albumDeleted = await AlbumModel.findByIdAndDelete({ _id: albumId });
      res.status(200).send({
            data: albumDeleted,
            msg: "Album deleted"
        });
    } catch (error) {
      res.status(400).send(error);
    }
  };