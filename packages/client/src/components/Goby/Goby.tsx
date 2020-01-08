import styles from './Goby.module.scss';
import React, {useState} from 'react';
import gobyFigure from "../../assets/realgoby.png";
import {useDidUpdateEffect} from "../../utilities/useDidUpdateEffect";
import {computeBearing, Coordinate} from "../../utilities/geometry";


interface GobyProps {
  nextPositionFn(a: Coordinate): Coordinate;
  onClick(): void;
  initialPosition: Coordinate; 
  moveInterval: number; 
  count: number;
  isFound: boolean;
}

export const Goby = ({initialPosition, nextPositionFn, count, moveInterval, onClick, isFound}: GobyProps) => {
  const [{x, y, b}, setCoords] = useState(() => {
    const nextPosition = nextPositionFn(initialPosition);
    // minus 60 for the angle of the fish in the image
    const initialBearing = computeBearing(initialPosition, nextPosition) - 60;

    return {...initialPosition, b: initialBearing}
  });

  useDidUpdateEffect(() => {
    if (count % moveInterval === 0 && !isFound) {
      const nextPosition = nextPositionFn({x, y});
      const nextBearing = computeBearing({x, y}, nextPosition) - 60;

      setCoords({...nextPosition, b: nextBearing})
    }
  }, [count]);

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
