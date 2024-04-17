import { Schema, model } from "mongoose";

interface IAlbumSchema {
  name: String;
  description: String;
  thumbnail: String;
  length: String;
  autorId: Number;
  songs: Array<Number>;
  publishedAt: String
  
}

const albumSchema = new Schema<IAlbumSchema>(
  {    
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    thumbnail:{
      type: String,
      required: false
    },
    length: {
      type: String,
      required: true,
    },
    autorId: {
      type: String,
      required: true,
      unique:true
    },
    songs: {
      type: [Number],
      required: true,
    },
    publishedAt: {
      type: String,
      required: false,
    } 
  }
);

const AlbumModel = model<IAlbumSchema>("Album", albumSchema);

export default AlbumModel;
