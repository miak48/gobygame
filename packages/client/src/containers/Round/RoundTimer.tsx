import React from 'react';
import Timer, {TimerControls} from 'react-compound-timer';
import {Fish, Round} from "./Round";


export interface RoundTimerProps {
  fish: Fish[];
}

export const RoundTimer = ({fish}: RoundTimerProps) => {

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
              <Round
                startTimer={start}
                stopTimer={stop}
                getTime={getTime}
                secondsElapsed={timerContext.s}
                timerState={getTimerState()}
                fish={fish}
              />
            )}
          </Timer.Consumer>
        )
      }}
    </Timer>
  )
};
