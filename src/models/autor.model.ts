import { Schema, model } from "mongoose";

interface IAutorSchema {
  name: String;
  albums: Array<Number>;
  songs: Array<Number>
}

const autorSchema = new Schema<IAutorSchema>(
  {    
    name: {
      type: String,
      required: true,
    },
    albums: {
      type: [Number],
      required: true,
    },
    songs: {
      type: [Number],
      required: true,
    }      
  }
);

const AutorModel = model<IAutorSchema>("Autor", autorSchema);

export default AutorModel;
