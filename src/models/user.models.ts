import { Schema, model } from "mongoose";

export enum Roles {
  superAdmin = 'superAdmin',
  admin = 'admin',
  artist = 'artist',
  listener = 'listener'
}

interface IUserSchema {
  username: String;
  picture: String;
  role: Roles; //not sure if that's a proper way of adding the type
  name: String;
  firstSurname: String;
  secondSurname: String;
  email: String;
  password: String;
  following: Array<Number>;
  followers: Array<Number>;
  autors: Array<Number>;
  albums: Array<Number>;
  playlists: Array<Number>;
  createAt?: Date;
  updateAt?: Date;
}

const userSchema = new Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    picture: {
      type: String,
      required: false
    },
    role: {
      type: String, // we should add type of Roles enum
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    firstSurname: {
      type: String,
      required: false,
    },
    secondSurname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers:{
      type: [Number],
      required:true
    },
    following:{
      type: [Number],
      required:true
    },
    autors:{
      type: [Number],
      required:true
    },
    albums:{
      type: [Number],
      required:true
    },
    playlists:{
      type: [Number],
      required:true
    }
  },
  { timestamps: true }
);

const UserModel = model<IUserSchema>("User", userSchema);

export default UserModel;
