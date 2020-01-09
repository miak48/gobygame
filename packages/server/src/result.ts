import {Document, model, Schema} from "mongoose";

export interface ResultDocument extends Document {
  uuid: string;
  round: number;
  fishOneTime: number;
  fishTwoTime: number;
}

const resultSchema = new Schema(
  {
    uuid: {type: String, required: true},
    round: {type: Number, required: true},
    fishOneTime: {type: Number, required: true},
    fishTwoTime: {type: Number, required: true},
  },
  {timestamps: true},
);

export const resultModel = model<ResultDocument>("result", resultSchema);
