import {GobyTrajectory} from "./GobyTrajectory";

export interface GameRound {
  roundId: number;
  timeLimit: number;
  gobies: GobyTrajectory[];
}
