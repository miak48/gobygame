import React from 'react';
import {RoundTimer} from "../Round/RoundTimer";

export const Game = () => {
  return (
    <RoundTimer
      fish={[{
        id: 'fish1',
        initialPosition: {x: 0, y: 100},
        nextPositionFn: ({x, y}) => ({x: x + 100, y: y + 10}),
        moveInterval: 1,
      }, {
        id: 'fish2',
        initialPosition: {x: 900, y: 600},
        nextPositionFn: ({x, y}) => ({x: x - 150, y: y - 50}),
        moveInterval: 2,
      }, {
        id: 'fish3',
        initialPosition: {x: 900, y: 500},
        nextPositionFn: ({x, y}) => ({x: x - 150, y: y - 50}),
        moveInterval: 2,
      }]}
    />
  )
};
