import { Request, Response } from "express";
import UserModel from "../models/user.models";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, role, name, firstSurname, secondSurname, email, password, following, followers, autors, albums, playlists } = req.body;

  try {
    const newUser = await UserModel.create({ username, role, name, firstSurname, secondSurname, email, password, following, followers, autors, albums, playlists });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const { userId } = req.params;

  try {
    const userUpdated = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { name, email, password },
      { new: true }
    );
    res.status(201).send(userUpdated);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userDeleted = await UserModel.findByIdAndDelete({ _id: userId });
    res.status(200).send(userDeleted);
  } catch (error) {
    res.status(400).send(error);
  }
};
