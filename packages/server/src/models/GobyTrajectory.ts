import {Schema} from "mongoose";

export const GobyTrajectorySchema = new Schema(
  {
    id: {type: String, required: true, unique: true},
    nextPositionFn: {type: String, required: true},
    initialPosition: {
      type: {x: Number, y: Number},
      required: true
    },
    moveInterval: {type: Number, required: true},
  },
  {timestamps: true},
);
