import {Document, model, Schema} from "mongoose";
import {RoundResult} from "@gobygame/models";

type RoundResultDocument = RoundResult & Document;

const RoundResultSchema = new Schema(
  {
    uuid: {type: String, required: true},
    round: {type: Number, required: true},
    fishOneTime: Number,
    fishTwoTime: Number,
  },
  {timestamps: true},
);

export const RoundResultModel = model<RoundResultDocument>("RoundResult", RoundResultSchema);
