import roundData from "../data/gameRounds.json";
import {GameRoundModel} from "../models/GameRound";
import {Request, Response} from "express-serve-static-core";

export const createRounds = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  GameRoundModel.collection.insertMany(roundData, (error, result) => {
    console.log("Inserted Game Round data", result?.insertedCount);
  });
};



export const getRoundByNumber = async (req: Request, res: Response) => {
  await GameRoundModel.findOne({roundId: req.params.number}, (err, result) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }
    if (!result) {
      return res
        .status(404)
        .json({success: false, error: `No Game Round ${req.params.number} found`});
    }
    return res.status(200).json({success: true, data: result});
  }).catch(err => console.log(err));
};

export const getRounds = async (req: Request, res: Response) => {
  await GameRoundModel.find({}, (err, results) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }
    if (!results.length) {
      return res
        .status(404)
        .json({success: false, error: "No Game Rounds found"});
    }
    return res.status(200).json({success: true, data: results});
  }).catch(err => console.log(err));
};
