import styles from './Goby.module.scss';
import React, {useState} from 'react';
import gobyFigure from "../../assets/realgoby_r.png";
import gobyFigure2 from "../../assets/realgoby_f.png";
import {useDidUpdateEffect} from "../../utilities/useDidUpdateEffect";
import {computeBearing, Coordinate} from "../../utilities/geometry";


export interface GobyProps {
  nextPositionFn(a: Coordinate): Coordinate;
  onClick(): void;
  initialPosition: Coordinate; 
  moveInterval: number; 
  count: number;
  isFound: boolean;
}

export const Goby = ({initialPosition, nextPositionFn, count, moveInterval, onClick, isFound}: GobyProps) => {
  const [{x, y, b, image}, setCoords] = useState(() => {
    const nextPosition = nextPositionFn(initialPosition);
    const initialBearing = computeBearing(initialPosition, nextPosition);

    return {...initialPosition, b: initialBearing, image: 0}
  });

  useDidUpdateEffect(() => {
    if (count % moveInterval === 0 && !isFound) {
      const nextPosition = nextPositionFn({x, y});
      const nextBearing = computeBearing({x, y}, nextPosition);

      setCoords({...nextPosition, b: nextBearing, image: image + 1})
    }
  }, [count]);

  return (
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
  );
};
