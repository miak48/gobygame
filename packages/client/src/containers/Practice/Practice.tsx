import React from 'react';
import roundData from "./gameRounds.json";
import {Round} from "../Round/Round";
import styles from "./Practice.module.scss";
import {Link} from "react-router-dom";
import {CircleButton} from "../../components/CircleButton/CircleButton";

export const Practice = () => {
  return (
    <Round
      // @ts-ignore
      data={roundData}
      saveResult={false}
      PostRoundOptions={
        <div className={styles.Centered}>
          <Link to={'/game'}>
            <CircleButton className={styles.StartGameButton}>
              Start Game
            </CircleButton>
          </Link>
        </div>
      }
    />
  );
};
