import React, {useState} from 'react';
import styles from './styles.module.scss';

const Display = ({xPage, setxPage}) => {
  const [open, setOpen] = useState (false);

  console.log (xPage);

  const onPage = pages => {
    setxPage (pages);
    setOpen (false);
  };

  return (
    <div>
      {open &&
        <div className={styles.dropdown}>
          <p className={styles.option} onClick={() => onPage (25)}>25</p>
          <p className={styles.option} onClick={() => onPage (50)}>50</p>
          <p className={styles.option} onClick={() => onPage (100)}>100</p>
        </div>}
      <div className={styles.display} onClick={() => setOpen (!open)}>
        <p>25</p>
        <svg
          className={open ? styles.arrowActive : styles.arrow}
          width="12"
          height="14"
          viewBox="0 0 12 14"
          fill="none"
        >
          <path
            d="M11.1377 6.01243C11.8044 6.39733 11.8044 7.35958 11.1377 7.74448L1.83567 13.115C1.16901 13.4999 0.335672 13.0188 0.335672 12.249L0.335672 1.50793C0.335672 0.738131 1.16901 0.257004 1.83567 0.641904L11.1377 6.01243Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default Display;
