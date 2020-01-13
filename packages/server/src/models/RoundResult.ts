import {Document, model, Schema} from "mongoose";

export interface RoundResultDocument extends Document {
  uuid: string;
  round: number;
  fishOneTime: number | null;
  fishTwoTime: number | null;
}

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
