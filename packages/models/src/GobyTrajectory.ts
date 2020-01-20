import {Coordinate} from "./Coordinate";

export interface GobyTrajectory {
  gobyId: string;
  initialBearing: number;
  positions: Coordinate[];
  image: number;
}
