import {RoundResultModel} from "../models/RoundResult";
import {Request, Response} from "express-serve-static-core";

export const createResult = (req: Request, res: Response) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Womp!",
    });
  }

  console.log("createResult", body);

  const model = new RoundResultModel(body);

  if (!model) {
    return res.status(400).json({success: false, error: "womp"});
  }

  model
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: model._id,
        message: "Round Result created!",
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "Round Result not created!",
      });
    });
};

export const getResultById = async (req: Request, res: Response) => {
  await RoundResultModel.findOne({_id: req.params.id}, (err, result) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }

    if (!result) {
      return res
        .status(404)
        .json({success: false, error: "Round Result not found"});
    }
    return res.status(200).json({success: true, data: result});
  }).catch(err => console.log(err));
};

export const getResults = async (req: Request, res: Response) => {
  await RoundResultModel.find({}, (err, results) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }
    if (!results.length) {
      return res
        .status(404)
        .json({success: false, error: "Round Result not found"});
    }
    return res.status(200).json({success: true, data: results});
  }).catch(err => console.log(err));
};
