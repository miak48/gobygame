import styles from './Goby.module.scss';
import React from 'react';
import gobyFigure from "../../assets/realgoby_r.png";
import gobyFigure2 from "../../assets/realgoby_f.png";
import {computeBearing} from "../../utilities/geometry";
import {GobyProps} from "./Goby";


interface BearingCoordinate {
  x: number;
  y: number;
  b: number;
  image: number | null
}

export const GobyPlotter = ({initialPosition, nextPositionFn, count, moveInterval, onClick, isFound}: GobyProps) => {
  const nextPosition = nextPositionFn(initialPosition);
  const initialBearing = computeBearing(initialPosition, nextPosition);
  const initialBearingCoordinate: BearingCoordinate = {...initialPosition, b: initialBearing, image: 2};

  const reducer = (coordinate: BearingCoordinate, count: number): BearingCoordinate => {
    if (count % moveInterval === 0) {
      const nextPosition = nextPositionFn(coordinate);
      const nextBearing = computeBearing(coordinate, nextPosition);

      return {...nextPosition, b: nextBearing, image: coordinate.image ? coordinate.image + 1 : 2};
    }
    return {...coordinate, image: null};
  };
  const {x, y, b, image} = [...Array(count).keys()].reduce(reducer, initialBearingCoordinate);

  return image !== null ? (
    <img
      src={image % 2 === 0 ? gobyFigure : gobyFigure2}
      className={styles.Goby}
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
  ) : null;
};
