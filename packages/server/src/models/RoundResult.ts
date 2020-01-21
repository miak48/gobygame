import {Document, model, Schema} from "mongoose";
import {RoundResult} from "@gobygame/models";
import {CoordinateSchema} from "./Coordinate";

const CatchTimeSchema = new Schema({
  gobyId: {type: String, required: true},
  position: {type: CoordinateSchema, required: true},
  time: {type: Number, required: true}
});

const RoundResultSchema = new Schema(
  {
    uuid: {type: String, required: true},
    roundId: {type: Number, required: true},
    attempt: {type: Number, required: true},
    totalTime: {type: Number, required: true},
    foundAll: {type: Number, required: true},
    catchTimes: [{
      gobyId: {type: String, required: true},
      catchTime: CatchTimeSchema
    }],
    missedClicks: [Object],
  },
  {timestamps: true},
);

export const RoundResultModel = model<RoundResult & Document>("RoundResult", RoundResultSchema);
