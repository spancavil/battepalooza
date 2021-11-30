import React, {useState} from 'react';

import styles from './styles.module.scss';

const Filters = () => {
  const [filters, setFilters] = useState ({
    COMMON: false,
    RARE: false,
    EPIC: false,
    LEGENDARY: false,
  });

  const onClick = e => {
    setFilters ({...filters, [e.target.name]: e.target.checked});
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>
          FILTERS
        </h2>
      </div>
      <div className={styles.filters}>
        <label className={styles.filter}>
          <input
            onClick={e => onClick (e)}
            value={filters.COMMON}
            type="checkbox"
            name="COMMON"
          />
          COMMON
        </label>

        <label className={styles.filter}>
          <input
            onClick={e => onClick (e)}
            value={filters.RARE}
            type="checkbox"
            name="RARE"
          />
          RARE
        </label>

        <label className={styles.filter}>
          <input
            onClick={e => onClick (e)}
            value={filters.LEGENDARY}
            type="checkbox"
            name="EPIC"
          />
          EPIC
        </label>

        <label className={styles.filter}>
          <input
            onClick={e => onClick (e)}
            value={filters.LEGENDARY}
            type="checkbox"
            name="LEGENDARY"
          />
          LEGENDARY
        </label>
      </div>
    </div>
  );
};

export default Filters;
