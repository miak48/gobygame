import {Document, model, Schema} from "mongoose";

export interface ResultDocument extends Document {
  uuid: string;
  round: number;
  fishOneTime: number | null;
  fishTwoTime: number | null;
}

const resultSchema = new Schema(
  {
    uuid: {type: String, required: true},
    round: {type: Number, required: true},
    fishOneTime: Number,
    fishTwoTime: Number,
  },
  {timestamps: true},
);

export const resultModel = model<ResultDocument>("result", resultSchema);
