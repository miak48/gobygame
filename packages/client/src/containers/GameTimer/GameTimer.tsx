import React from 'react';
import Timer from 'react-compound-timer';
import {Game} from "../Game/Game";

export const GameTimer = () => {
  return (
    <Timer
      timeToUpdate={16}
      startImmediately={false}
    >
      {({start, stop, getTime, setCheckpoints}: any) => {
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
              />
            )}
          </Timer.Consumer>
        )
      }}
    </Timer>
  )
};