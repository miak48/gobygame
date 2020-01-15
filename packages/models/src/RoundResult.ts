import {Coordinate} from "./Coordinate";

export interface CatchTime {
  gobyId: string;
  time: number;
  position: Coordinate;
}

type GobyCoordinates = {
  id: string;
  position: Coordinate;
};

export interface Click {
  time: number;
  position: Coordinate;
  success: boolean;
  locations: GobyCoordinates[];
}

export interface RoundResult {
  uuid: string;
  roundId: number;
  attempt: number;
  totalTime: number;
  numberOfGobies: number;
  foundAll: boolean;
  catchTimes: CatchTime[];
  clicks: Click[];
}
