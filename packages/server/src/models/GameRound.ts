import {Document, model, Schema} from "mongoose";
import {GobyTrajectorySchema} from "./GobyTrajectory";
import {GameRound} from "@gobygame/models";


const GameRoundSchema = new Schema(
  {
    roundId: {type: Number, required: true, unique: true},
    timeLimit: {type: Number, required: true},
    gobies: [GobyTrajectorySchema]
  },
  {timestamps: true},
);

export const GameRoundModel = model<GameRound & Document>("GameRound", GameRoundSchema);
