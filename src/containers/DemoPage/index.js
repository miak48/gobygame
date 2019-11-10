import React from 'react';
import background from '../../assets/images/gravel2.png';
import styles from './DemoPage.module.scss';

function DemoPage() {
  return (
    <div className={styles.DemoPage}>
        <img src={background} alt=" " className={styles.backgroundGravel} />
        <div className={styles.square} />
    </div>
  );
}

export default DemoPage;
