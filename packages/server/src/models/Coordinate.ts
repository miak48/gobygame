import {Schema} from "mongoose";

export const CoordinateSchema = new Schema({
  x: {type: Number, required: true},
  y: {type: Number, required: true}
});
