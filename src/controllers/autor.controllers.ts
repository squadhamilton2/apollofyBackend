import { Request, Response } from "express";
import AutorModel from "../models/autor.model";

export const getAutor = async (req: Request, res: Response) => {
  try {
    const { autorId } = req.params;
    const autor = await AutorModel.findById(autorId); 
    
    if (!autor) { 
      return res.status(404).send("Autor no encontrado");
    }
    
    res.status(200).send({
        data: autor,
        msg: "Here are your autors!"
      }); 
   } catch (error) { 
    res.status(500).send(error);
  }
};


export const createAutor = async (req: Request, res: Response) => {
  const { name, albums, songs } = req.body;

  try {
    const newAutor = await AutorModel.create({ name, albums, songs });
    res.status(201).send({
        data: newAutor,
        msg: "New autor created"});
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
    res.status(201).send({
        data: autorUpdated,
        msg: "Autor updated"});
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const deleteAutor = async (req: Request, res: Response) => {
  const { autorId } = req.params;
  try {
    const autorDeleted = await AutorModel.findByIdAndDelete({ _id: autorId });
    res.status(200).send({
        data: autorDeleted,
        msg: "Autor deleted"
      });
  } catch (error) {
    res.status(400).send(error);
  }
};
