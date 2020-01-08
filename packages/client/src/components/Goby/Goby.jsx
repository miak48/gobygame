import styles from './Goby.module.scss';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import goby_fig from "../../containers/Demo/assets/realgoby.png";
import useDidUpdateEffect from "../../utils/useDidUpdateEffect";

// shorturl.at/nowLR
// Computes the bearing in degrees from the point A(x,y) to
// the point B(x,y). Note that A and B are given in terms of
// screen coordinates.
const bearing = (a, b) => {
  const TWOPI = 6.2831853071795865;
  const RAD2DEG = 57.2957795130823209;
  // if (a.x = b.x and a.y = b.y) throw an error
  let theta = Math.atan2(b.x - a.x, a.y - b.y);
  if (theta < 0.0) {
    theta += TWOPI;
  }
  return RAD2DEG * theta;
};

export const Goby = ({initialPosition, nextPositionFn, count, moveInterval, onClick, isFound}) => {
  const [{x, y, b}, setCoords] = useState(() => {
    const nextPosition = nextPositionFn(initialPosition);
    // minus 60 for the angle of the fish in the image
    const initialBearing = bearing(initialPosition, nextPosition) - 60;

    return {...initialPosition, b: initialBearing}
  });

  useDidUpdateEffect(() => {
    if (count % moveInterval === 0 && !isFound) {
      const nextPosition = nextPositionFn({x, y});
      const nextBearing = bearing({x, y}, nextPosition) - 60;

      setCoords({...nextPosition, b: nextBearing})
    }
  }, [count]);

  return (
    <img
      src={goby_fig}
      className={styles.square}
      onClick={onClick}
      style={{
        top: y,
        left: x,
        transform: `rotate(${b}deg)`,
        filter: !isFound
          ? 'none'
          : 'sepia(100%) saturate(300%) brightness(70%) hue-rotate(90deg)',
      }}
    />
  );
};

Goby.propTypes = {
  initialPosition: PropTypes.object,
  nextPositionFn: PropTypes.func,
  count: PropTypes.number,
  moveInterval: PropTypes.number,
  onClick: PropTypes.func,
  isFound: PropTypes.bool,
};
