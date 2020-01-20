import {MouseEvent, MutableRefObject, useRef, useState} from "react";
import {MissedClick} from "@gobygame/models";
import {GobyProps} from "../components/Goby/Goby";

export interface UseClickTracker {
  onClick(event: MouseEvent<HTMLDivElement>): void;
  ref: MutableRefObject<HTMLDivElement | null>;
  clicks: MissedClick[];
}

export const useClickTracker = (gobyLocations: GobyProps[], getTime: () => number): UseClickTracker => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [missedClicks, setMissedClicks] = useState<MissedClick[]>([]);

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = ref.current!.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    const newClick: MissedClick = {
      time: getTime(),
      position: {x, y},
      success: false,
      locations: gobyLocations,
    };

    setMissedClicks([...missedClicks, newClick])
  };

  return {
    onClick,
    ref,
    clicks: missedClicks,
  };
};
