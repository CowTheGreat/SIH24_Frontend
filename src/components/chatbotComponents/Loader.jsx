import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.mainContainer}>
    <div className={styles.loader}>
      <div className={styles.circle} />
      <div className={styles.circle} />
      <div className={styles.circle} />
      <div className={styles.circle} />
    </div>
    </div>
   
  );
};

export default Loader;
