import styles from './Goby.module.scss';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';


export const Goby = ({initialPosition, nextPositionFn, count, moveInterval, onClick, isFound}) => {

    const [gCount, setCount] = useState(0);
    useEffect(() => {
        if (count % moveInterval === 0) {
            setCount(gCount => gCount + 1);
        }
    }, [count]);

    const [{x, y}, setCoords] = useState(initialPosition);
    useEffect(() => {
        setCoords(nextPositionFn({x, y}))
    }, [gCount]);

    return (
        <div
            className={styles.square}
            style={{
                top: y,
                left: x,
                backgroundColor: !isFound ? 'purple' : 'green'
            }}
            onClick={onClick}
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
