import React, {useState} from 'react';
import {useMediaQuery} from '../../../../Hooks/useMediaQuery';

import styles from './styles.module.scss';

const Filters = ({filters, setFilters, setPage, input, setInput}) => {
  const breakpoint = useMediaQuery ('(max-width: 1199px)');
  const [menu, setMenu] = useState (false);

  const onChange = e => {
    setFilters ({...filters, [e.target.name]: e.target.checked});
    setPage(1)
    setInput(1)
  };

  return breakpoint
    ? <>
    <div onClick={() => setMenu (!menu)} className={styles.btnFilter}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.91016 14.5105V2.04926"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.91016 25.8692V18.7641"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 16.3413V2.04926"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 25.8692V20.5744"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.9551 4.43125V2.04926"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.9551 25.8693V8.86179"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.44727 14.5105H7.0207"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.7129 16.3548H25.2863"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.668 8.27646H16.2414"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {menu &&
        breakpoint &&
        <div className={styles.menuFilter}>
          <h2>
            FILTERS
          </h2>
          <div className={styles.filtersMobile}>
            <label className={styles.filter}>
              <input
                onChange={e => onChange (e)}
                value={filters.COMMON}
                type="checkbox"
                name="COMMON"
                checked={filters.COMMON ?? true}
              />
              COMMON
            </label>

            <label className={styles.filter}>
              <input
                onChange={e => onChange (e)}
                value={filters.RARE}
                type="checkbox"
                name="RARE"
                checked={filters.RARE ?? true}
              />
              RARE
            </label>

            <label className={styles.filter}>
              <input
                onChange={e => onChange (e)}
                value={filters.EPIC}
                type="checkbox"
                name="EPIC"
                checked={filters.EPIC ?? true}
              />
              EPIC
            </label>

            <label className={styles.filter}>
              <input
                onChange={e => onChange (e)}
                value={filters.LEGENDARY}
                type="checkbox"
                name="LEGENDARY"
                checked={filters.LEGENDARY ?? true}
              />
              LEGENDARY
            </label>
          </div>
        </div>}
        {menu &&
        breakpoint && <div onClick={() => setMenu(false)} className={styles.bg}></div> }
</>
    : <div className={styles.container}>
        <div className={styles.title}>
          <h2>
            FILTERS
          </h2>
        </div>
        <div className={styles.filters}>
          <label className={styles.filter}>
            <input
              onChange={e => onChange (e)}
              value={filters.COMMON}
              type="checkbox"
              name="COMMON"
              checked={filters.COMMON ?? true}
            />
            COMMON
          </label>

          <label className={styles.filter}>
            <input
              onChange={e => onChange (e)}
              value={filters.RARE}
              type="checkbox"
              name="RARE"
              checked={filters.RARE ?? true}
            />
            RARE
          </label>

          <label className={styles.filter}>
            <input
              onChange={e => onChange (e)}
              value={filters.LEGENDARY}
              type="checkbox"
              name="EPIC"
              checked={filters.EPIC ?? true}
            />
            EPIC
          </label>

          <label className={styles.filter}>
            <input
              onChange={e => onChange (e)}
              value={filters.LEGENDARY}
              type="checkbox"
              name="LEGENDARY"
              checked={filters.LEGENDARY ?? true}
            />
            LEGENDARY
          </label>
        </div>
      </div>;
};

export default Filters;
