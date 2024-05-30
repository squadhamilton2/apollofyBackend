import { Request, Response } from "express";
import UserModel from "../models/user.models";

export const getAllUser = async (req: Request, res: Response) => {
  try {
   
    const allUsers = await UserModel.find();
    res.status(200).send({
        data: allUsers,
        type: "array",
        msg: "Here are your users!"
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId).exec();
    res.status(200).send({
        data: user,
        type: "object",
        msg: "Here are your users!"
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, picture, role, name, firstSurname, secondSurname, email, password, following, followers, autors, albums, playlists } = req.body;

  try {
    const newUser = await UserModel.create({ username, picture, role, name, firstSurname, secondSurname, email, password, following, followers, autors, albums, playlists });
    res.status(201).send({
        data: newUser,
        msg: "New user created"
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { username, name, picture, firstSurname, secondSurname, email, password } = req.body;
  const { userId } = req.params;

  try {
    const userUpdated = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { username, name, picture, firstSurname, secondSurname, email, password },
      { new: true }
    );
    res.status(201).send({
        data: userUpdated,
        msg: "User updated"
    });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userDeleted = await UserModel.findByIdAndDelete({ _id: userId });
    res.status(200).send({
      data: userDeleted,
      msg: "User deleted"    
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
