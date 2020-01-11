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
                fish={[{
                  id: 'fish1',
                  initialPosition: {x: 0, y: 100},
                  nextPositionFn: ({x, y}) => ({x: x + 100, y: y + 10}),
                  moveInterval: 1,
                }, {
                  id: 'fish2',
                  initialPosition: {x: 900, y: 600},
                  nextPositionFn: ({x, y}) => ({x: x - 150, y: y - 50}),
                  moveInterval: 2,
                }, {
                  id: 'fish3',
                  initialPosition: {x: 900, y: 500},
                  nextPositionFn: ({x, y}) => ({x: x - 150, y: y - 50}),
                  moveInterval: 2,
                }]}
              />
            )}
          </Timer.Consumer>
        )
      }}
    </Timer>
  )
};
