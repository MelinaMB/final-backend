//@ts-check
import { Schema, model } from "mongoose";
// se define un esquema
const schema = new Schema({
  user: { type: String, required: true, max: 100 },
  message: { type: String, required: true, max: 100 },
  
});
// unique: true es para que no se vuelva a repetir el mail que pongo

export const MsgModel = model("messages", schema);