import {useEffect, useRef} from 'react';

const useDidUpdateEffect = (effect, inputs) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current)
      effect();
    else
      didMountRef.current = true;
  }, inputs); // eslint-disable-line
};

export default useDidUpdateEffect;
