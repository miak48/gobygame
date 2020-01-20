import {Document, model, Schema} from "mongoose";
import {RoundResult} from "@gobygame/models";

const RoundResultSchema = new Schema(
  {
    uuid: {type: String, required: true},
    roundId: {type: Number, required: true},
    attempt: {type: Number, required: true},
    totalTime: {type: Number, required: true},
    numberOfGobies: {type: Number, required: true},
    foundAll: {type: Number, required: true},
    catchTimes: [Object],
    missedClicks: [Object],
  },
  {timestamps: true},
);

export const RoundResultModel = model<RoundResult & Document>("RoundResult", RoundResultSchema);
