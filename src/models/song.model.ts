import { Schema, model } from "mongoose";

interface ISongSchema {
  name: String;
  songUrl: String;
  length: String;
  autorId: Number;
  albumId: Number;
  genreId: Number
}

const songSchema = new Schema<ISongSchema>(
  {    
    name: {
      type: String,
      required: true,
    },
    songUrl: {
      type: String,
      required: false,
      unique: true
    },
    length: {
      type: String,
      required: true,
    },
    autorId: {
      type: String,
      required: false,
      unique: true
    },
    albumId: {
      type: String,
      required: false,
      unique: true
    },
    genreId: {
      type: String,
      required: false,
      unique: true
    }  
  }
);

const SongModel = model<ISongSchema>("Song", songSchema);

export default SongModel;
