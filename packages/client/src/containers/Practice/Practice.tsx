import React from 'react';
import roundData from "./gameRounds.json";
import {Round} from "../Round/Round";
import styles from "./Practice.module.scss";
import {Link} from "react-router-dom";
import {CircleButton} from "../../components/CircleButton/CircleButton";
import {Centered} from "../../components/Centered/Centered";

export const Practice = () => {
  return (
    <Round
      // @ts-ignore
      data={roundData}
      saveResult={false}
      PreRoundInstructions={
        <React.Fragment>
          <div className={styles.PracticeText}>Lets start with some practice</div>
          <div className={styles.PracticeText}>Click on as many gobies as you can before the time runs out</div>
        </React.Fragment>
      }
      PostRoundOptions={
        <Centered height={110} width={'100%'}>
          <div className={styles.PracticeText}>Now lets do this for real!</div>
          <Link to={'/game'}>
            <CircleButton className={styles.StartGameButton}>
              Start Game
            </CircleButton>
          </Link>
        </Centered>
      }
    />
  );
};
