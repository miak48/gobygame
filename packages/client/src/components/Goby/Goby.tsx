import styles from './Goby.module.scss';
import React from 'react';
import gobyNoCamo from "../../assets/GobyNoCamo.png";
import gobyCamo from "../../assets/GobyCamo.png";
import {Coordinate} from "@gobygame/models";


export enum GobyStatus {
  SWIMMING, DISCOVERED, UNDISCOVERED
}

export interface GobyProps {
  position: Coordinate;
  onClick(coordinate: Coordinate): void;
  status: GobyStatus;
  display?: boolean;
  bearing: number;
  image: number;
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

export const Goby = ({position, bearing, onClick, status, display, image}: GobyProps) => {
  return (
    <img
      src={image === 1 ? gobyNoCamo : gobyCamo}
      className={styles.Goby}
      onClick={() => onClick(position)}
      style={{
        top: position.y,
        left: position.x,
        transform: `rotate(${bearing}deg)`,
        filter: getFilterFromStatus(status),
        opacity: display ? 1 : 0
      }}
      alt={''}
    />
  );
};
