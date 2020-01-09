import styles from './Goby.module.scss';
import React from 'react';
import gobyFigure from "../../assets/realgoby.png";
import {computeBearing} from "../../utilities/geometry";
import {GobyProps} from "./Goby";


interface BearingCoordinate {
  x: number;
  y: number;
  b: number;
}

export const GobyPlotter = ({initialPosition, nextPositionFn, count, moveInterval, onClick, isFound}: GobyProps) => {
  const nextPosition = nextPositionFn(initialPosition);
  // minus 60 for the angle of the fish in the image
  const initialBearing = computeBearing(initialPosition, nextPosition) - 60;
  const initialBearingCoordinate = {...initialPosition, b: initialBearing};

  const reducer = (coord: BearingCoordinate, count: number) => {
    if (count % moveInterval === 0) {
      const nextPosition = nextPositionFn(coord);
      const nextBearing = computeBearing(coord, nextPosition) - 60;

      return {...nextPosition, b: nextBearing};
    }
    return coord;
  };
  const {x, y, b} = [...Array(count).keys()].reduce(reducer, initialBearingCoordinate);

  return (
    <img
      src={gobyFigure}
      className={styles.square}
      onClick={onClick}
      style={{
        top: y,
        left: x,
        transform: `rotate(${b}deg)`,
        filter: !isFound
          ? 'none'
          : 'sepia(100%) saturate(300%) brightness(70%) hue-rotate(90deg)',
      }}
      alt={''}
    />
  );
};
