import styles from './Goby.module.scss';
import React, {useState} from 'react';
import gobyFigure from "../../assets/realgoby_r.png";
import gobyFigure2 from "../../assets/realgoby_f.png";
import {useDidUpdateEffect} from "../../hooks/useDidUpdateEffect";
import {computeBearing} from "../../utilities/geometry";
import {Coordinate} from "@gobygame/models";
import {GobyTrajectory} from "@gobygame/models";


export enum GobyStatus {
  SWIMMING, DISCOVERED, UNDISCOVERED
}

export interface GobyProps extends Omit<GobyTrajectory, 'gobyId'>{
  onClick(coordinate: Coordinate): void;
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

export const Goby = ({positions, initialBearing, count, onClick, status}: GobyProps) => {
  const [{x, y, b, image}, setCoords] = useState({...positions[count], b: initialBearing, image: 0});

  useDidUpdateEffect(() => {
    if (status === GobyStatus.SWIMMING) {
      const nextPosition = positions[count];
      const nextBearing = computeBearing({x, y}, nextPosition);

      const isStill = x === nextPosition.x && y === nextPosition.y;

      setCoords({...nextPosition, b: isStill ? b : nextBearing, image: isStill ? image : image + 1})
    }
  }, [count]);

  return (
    <img
      src={image % 2 === 0 ? gobyFigure : gobyFigure2}
      className={styles.Goby}
      onClick={() => onClick({x, y})}
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
