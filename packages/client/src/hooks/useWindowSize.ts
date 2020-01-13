import {useEffect, useState} from "react";


export interface WindowSize {
  height: number;
  width: number;
}

export const useWindowSize = (): WindowSize => {

  const getSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // Empty array ensures that effect is only run on mount and unmount
  }, []); // eslint-disable-line

  return windowSize;
};
