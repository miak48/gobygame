import {Coordinate} from "./Coordinate";

export interface GobyTrajectory {
  id: string;
  // nextPositionFn(a: Coordinate): Coordinate;
  nextPositionFn: string;
  initialPosition: Coordinate;
  moveInterval: number;
}
