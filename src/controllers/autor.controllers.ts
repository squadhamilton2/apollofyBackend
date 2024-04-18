import { Request, Response } from "express";
import AutorModel from "../models/autor.model";

export const getAutor = async (req: Request, res: Response) => {
  try {
    const { autorId } = req.params;
    const autor = await AutorModel.findById(autorId); 
    
    if (!autor) { 
      return res.status(404).send("Autor no encontrado");
    }
    
    res.status(200).send(autor); 
   } catch (error) { 
    res.status(500).send(error);
  }
};


export const createAutor = async (req: Request, res: Response) => {
  const { name, albums, songs } = req.body;

  try {
    const newAutor = await AutorModel.create({ name, albums, songs });
    res.status(201).send(newAutor);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateAutor = async (req: Request, res: Response) => {
  const { name, albums, songs } = req.body;
  const { autorId } = req.params;

  try {
    const autorUpdated = await AutorModel.findByIdAndUpdate(
      { _id: autorId },
      { name, albums, songs },
      { new: true }
    );
    res.status(201).send(autorUpdated);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const deleteAutor = async (req: Request, res: Response) => {
  const { autorId } = req.params;
  try {
    const autorDeleted = await AutorModel.findByIdAndDelete({ _id: autorId });
    res.status(200).send(autorDeleted);
  } catch (error) {
    res.status(400).send(error);
  }
};
