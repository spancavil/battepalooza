import React, { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import styles from "./styles.module.scss";

const Display = ({ xPage, setxPage, setPage, setInput }) => {
  const [open, setOpen] = useState(false);

  const breakpoint = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    breakpoint ? setxPage(4) : setxPage(25);
  }, [breakpoint, setxPage]);

  const onPage = (pages) => {
    setxPage(pages);
    setOpen(false);
    setPage(1);
    setInput(1);
  };

  return (
    <Fragment>
      <div className={styles.display} onClick={() => setOpen(!open)}>
        <div className={styles.selected}>
          <p>{xPage}</p>
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
        {open && (
          <div className={styles.dropdown}>
            <p
              className={styles.option}
              onClick={() => onPage(breakpoint ? 4 : 25)}
            >
              {breakpoint ? 4 : 25}
            </p>
            <p
              className={styles.option}
              onClick={() => onPage(breakpoint ? 8 : 50)}
            >
              {breakpoint ? 8 : 50}
            </p>
            <p
              className={styles.option}
              onClick={() => onPage(breakpoint ? 16 : 100)}
            >
              {breakpoint ? 16 : 100}
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Display;
