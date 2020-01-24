import {Document, model, Schema} from "mongoose";
import {RoundResult} from "@gobygame/models";

const RoundResultSchema = new Schema(
  {
    uuid: {type: String, required: true},
    roundId: {type: Number, required: true},
    attempt: {type: Number, required: true},
    totalTime: {type: Number, required: true},
    foundAll: {type: Boolean, required: true},
    gaveUp: {type: Boolean, required: true},
    catchTimes: [{
      gobyId: {type: String, required: true},
      catchTime: Object
    }],
    misses: [{
      gobyId: {type: String, required: true},
      missedClicks: [Object]
    }],
  },
  {timestamps: true},
);

export const RoundResultModel = model<RoundResult & Document>("RoundResult", RoundResultSchema);
