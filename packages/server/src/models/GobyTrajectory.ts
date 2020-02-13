import {Schema} from "mongoose";
import {CoordinateSchema} from "./Coordinate";

export const GobyTrajectorySchema = new Schema(
  {
    gobyId: {type: String, required: true, unique: true},
    initialBearing: {type: Number, required: true},
    positions: [CoordinateSchema],
    image: Number,
  },
  {timestamps: true},
);
