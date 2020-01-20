import {Schema} from "mongoose";

export const GobyTrajectorySchema = new Schema(
  {
    gobyId: {type: String, required: true, unique: true},
    initialBearing: {type: Number, required: true},
    positions: [{x: Number, y: Number}],
    image: Number,
  },
  {timestamps: true},
);
