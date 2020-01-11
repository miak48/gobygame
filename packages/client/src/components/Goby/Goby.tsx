import styles from './Goby.module.scss';
import React, {useState} from 'react';
import gobyFigure from "../../assets/realgoby_r.png";
import gobyFigure2 from "../../assets/realgoby_f.png";
import {useDidUpdateEffect} from "../../utilities/useDidUpdateEffect";
import {computeBearing} from "../../utilities/geometry";
import {Fish} from "../../containers/Game/Game";


export enum GobyStatus {
  SWIMMING, DISCOVERED, UNDISCOVERED
}

export interface GobyProps extends Omit<Fish, 'id'>{
  onClick(): void;
  count: number;
  status: GobyStatus;
}

const getFilterFromStatus = (status: GobyStatus): string => {
  switch (status) {
    case GobyStatus.DISCOVERED:
      return 'sepia(100%) saturate(300%) brightness(70%) hue-rotate(90deg)';
    case GobyStatus.UNDISCOVERED:
      return 'sepia(100%) saturate(300%) brightness(80%) hue-rotate(300deg)';
    case GobyStatus.SWIMMING:
    default:
      return 'none';
  }
};

export const Goby = ({initialPosition, nextPositionFn, count, moveInterval, onClick, status}: GobyProps) => {
  const [{x, y, b, image}, setCoords] = useState(() => {
    const nextPosition = nextPositionFn(initialPosition);
    const initialBearing = computeBearing(initialPosition, nextPosition);

    return {...initialPosition, b: initialBearing, image: 0}
  });

  useDidUpdateEffect(() => {
    if (count % moveInterval === 0 && status === GobyStatus.SWIMMING) {
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
        filter: getFilterFromStatus(status),
      }}
      alt={''}
    />
  );
};
