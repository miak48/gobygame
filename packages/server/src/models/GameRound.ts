import {Document, model, Schema} from "mongoose";
import {GobyTrajectory, GobyTrajectorySchema} from "./GobyTrajectory";


export interface GameRound extends Document {
  round: number;
  timeLimit: number;
  gobies: GobyTrajectory[];
}

const GameRoundSchema = new Schema(
  {
    round: {type: Number, required: true, unique: true},
    timeLimit: {type: Number, required: true},
    gobies: [GobyTrajectorySchema]
  },
  {timestamps: true},
);

export const GameRoundModel = model<GameRound>("GameRound", GameRoundSchema);
