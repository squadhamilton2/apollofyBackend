import { Schema, model } from "mongoose";

interface ISongSchema {
  name: string;
  songUrl: string;
  public_id_songUrl: string;
  imageUrl: string;
  public_id_imageUrl: string;
  length: string;
  autorId: number;
  albumId: number;
  genreId: number;
}

const songSchema = new Schema<ISongSchema>({
  name: {
    type: String,
    required: true,
  },
  songUrl: {
    type: String,
    required: true,
    unique: true,
  },
  public_id_songUrl: {
    type: String,
    required: false,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  public_id_imageUrl: {
    type: String,
    required: false,
  },
  length: {
    type: String,
    required: false,
  },
  autorId: {
    type: Number,
    required: false,
    unique: true,
  },
  albumId: {
    type: Number,
    required: false,
    unique: true,
  },
  genreId: {
    type: Number,
    required: false,
    unique: true,
  },
});

const SongModel = model<ISongSchema>("Song", songSchema);

export default SongModel;
