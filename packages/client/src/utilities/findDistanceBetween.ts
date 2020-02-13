import {Coordinate} from "@gobygame/models";


export const findDistanceBetween = (a: Coordinate, b: Coordinate): number => {
  return Math.hypot(b.x - a.x, b.y - a.y);
};
