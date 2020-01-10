import React from 'react';
import Timer, {TimerControls} from 'react-compound-timer';
import {Game} from "./Game";

export const GameTimer = () => {

  return (
    <Timer
      timeToUpdate={16}
      startImmediately={false}
    >
      {({start, stop, getTime, setCheckpoints, getTimerState}: TimerControls) => {
        setCheckpoints([{
          time: 10000,
          callback: stop,
        }]);

        return (
          <Timer.Consumer>
            {timerContext => (
              <Game
                startTimer={start}
                stopTimer={stop}
                getTime={getTime}
                secondsElapsed={timerContext.s}
                timeRemainingPercent={`${100 - (getTime() / 100)}%`}
                timerState={getTimerState()}
              />
            )}
          </Timer.Consumer>
        )
      }}
    </Timer>
  )
};
