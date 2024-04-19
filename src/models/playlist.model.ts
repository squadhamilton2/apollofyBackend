import { Schema, model } from "mongoose";

interface IPlaylistSchema {
    songs: Array<Number>;
    publicAccess: boolean;
    owner: Number;
    writers: Array<Number>;
    readers: Array<Number>
}

const playlistSchema = new Schema<IPlaylistSchema>(
    {
        songs:{
            type: [Number],
            required: true
        },
        publicAccess:{
            type: Boolean,
            required: true,
        },
        owner: {
            type: Number,
            required: true,
        },
        writers: {
            type: [Number],
            required: true
        },
        readers: {
            type: [Number],
            required: true
        }
    }
)

const PlaylistModel = model<IPlaylistSchema>("Playlist", playlistSchema)

export default PlaylistModel