import {Document, Schema} from "mongoose";

export interface Coordinate {
  x: number;
  y: number;
}

export interface GobyTrajectory extends Document {
  id: string;
  // nextPositionFn(a: Coordinate): Coordinate;
  nextPositionFn: string;
  initialPosition: Coordinate;
  moveInterval: number;
}

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
