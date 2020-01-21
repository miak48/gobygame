import {Coordinate} from "./Coordinate";


export interface GobyCoordinates {
  gobyId: string;
  position: Coordinate;
}

export interface CatchTime extends GobyCoordinates {
  time: number;
  nearestNeighbor: string | null;
  nearestNeighborPosition: Coordinate | null;
  nearestNeighborDistance: number | null;
}

export interface MissedClick {
  time: number;
  distance: number;
  targetGobyId: string;
}

export interface RoundResult {
  uuid: string;
  roundId: number;
  attempt: number;
  totalTime: number;
  foundAll: boolean;
  catchTimes: {gobyId: string; catchTime: CatchTime | null}[];
  misses: {gobyId: string; missedClicks: MissedClick[]}[];
}
