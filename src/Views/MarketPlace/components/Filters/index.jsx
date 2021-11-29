import React from 'react';
import {filters} from './Filters';

import styles from './styles.module.scss';

const Filters = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>
          FILTERS
        </h2>
      </div>
      <div className={styles.filters}>
        {filters.map (filter => (
          <div className={styles.filter}>
            <input type="checkbox" />
            <p>{filter}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
