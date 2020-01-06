import styles from './Goby.module.scss';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import goby_fig from "../../containers/Demo/assets/realgoby.png";

// shorturl.at/nowLR
// Computes the bearing in degrees from the point A(a1,a2) to
// the point B(b1,b2). Note that A and B are given in terms of
// screen coordinates.
const bearing = (a1, a2, b1, b2) => {
  const TWOPI = 6.2831853071795865;
  const RAD2DEG = 57.2957795130823209;
  // if (a1 = b1 and a2 = b2) throw an error
  let theta = Math.atan2(b1 - a1, a2 - b2);
  if (theta < 0.0) {
    theta += TWOPI;
  }
  return RAD2DEG * theta;
};

export const Goby = ({initialPosition, nextPositionFn, count, moveInterval, onClick, isFound}) => {
  const [{x, y, b}, setCoords] = useState({...initialPosition, b: 0});

  useEffect(() => {
    if (count % moveInterval === 0 && !isFound) {
      const nextPosition = nextPositionFn({x, y});
      // minus 60 for the angle of the fish in the initial image
      const nextb = bearing(x, y, nextPosition.x, nextPosition.y) - 60;

      setCoords({...nextPosition, b: nextb})
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
