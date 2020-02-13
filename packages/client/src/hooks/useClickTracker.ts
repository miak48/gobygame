import {MouseEvent, MutableRefObject, useRef, useState} from "react";
import {MissedClick} from "@gobygame/models";
import {GobyProps, GobyStatus} from "../components/Goby/Goby";
import {findDistanceBetween} from "../utilities/findDistanceBetween";
import {findMinInObject} from "../utilities/findMinObject";


interface GobyMisses {
  [key: string]: MissedClick[];
}

export interface UseClickTracker {
  onClick(event: MouseEvent<HTMLDivElement>): void;
  ref: MutableRefObject<HTMLDivElement | null>;
  clicks: GobyMisses;
}

const THREE_GOBY_BODY_LENGTHS = 300;

export const useClickTracker = (gobyLocations: GobyProps[], getTime: () => number): UseClickTracker => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [missedClicks, setMissedClicks] = useState<GobyMisses>(() => {
    return gobyLocations.reduce((gobyMisses, goby) => {
      return {...gobyMisses, [goby.gobyId]: []};
    }, {})
  });

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = ref.current!.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    const clickDistancesFromSwimmingGobies = gobyLocations
      .filter(goby => goby.status === GobyStatus.SWIMMING)
      .map(goby => ({
        targetGobyId: goby.gobyId,
        time: getTime(),
        distance: findDistanceBetween({x, y}, goby.position)
      }));

    const closestSwimmingGoby = findMinInObject(clickDistancesFromSwimmingGobies, 'distance');

    if ((closestSwimmingGoby?.distance ?? Number.MAX_SAFE_INTEGER) < THREE_GOBY_BODY_LENGTHS) {
      console.log('recording missed click', closestSwimmingGoby?.distance, closestSwimmingGoby?.targetGobyId)
      setMissedClicks({
        ...missedClicks,
        [closestSwimmingGoby!.targetGobyId]: [...missedClicks[closestSwimmingGoby!.targetGobyId], closestSwimmingGoby!]
      })
    }
  };

  return {
    onClick,
    ref,
    clicks: missedClicks,
  };
};
