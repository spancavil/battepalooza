import React from 'react';
import styles from './styles.module.scss';

const Pagination = ({page, setPage, max, input, setInput}) => {
  const nextPage = () => {
    setPage (parseInt (page) + 1);
    setInput (parseInt (input) + 1);
  };
  const previousPage = () => {
    setPage (parseInt (page) - 1);
    setInput (parseInt (input) - 1);
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      setPage (parseInt (e.target.value));
      if (
        parseInt (e.target.value) < 1 ||
        parseInt (e.target.value) > Math.ceil (max) ||
        isNaN (parseInt (e.target.value))
      ) {
        setPage (1);
        setInput (1);
      } else {
        setPage (parseInt (e.target.value));
      }
    }
  };

  const handleChange = e => {
    setInput (e.target.value);
  };

  return (
    <div className={styles.container}>
      <button disabled={page === 1 || page < 1} onClick={previousPage}>
        <svg
          width="12"
          height="14"
          viewBox="0 0 12 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.862306 7.7449C0.19564 7.36 0.195638 6.39774 0.862304 6.01284L10.1643 0.642319C10.831 0.257419 11.6643 0.738543 11.6643 1.50834L11.6643 12.2494C11.6643 13.0192 10.831 13.5003 10.1643 13.1154L0.862306 7.7449Z"
            fill="white"
          />
        </svg>
      </button>
      <input
        className={styles.input}
        onKeyDown={e => onKeyDown (e)}
        onChange={e => handleChange (e)}
        autoComplete="off"
        name="page"
        value={input}
      />
      <p>of</p>
      <input
        className={styles.inputDisabled}
        disabled
        value={Math.ceil (max)}
      />
      <button
        disabled={page === Math.ceil (max) || page > Math.ceil (max)}
        onClick={nextPage}
      >
        <svg
          width="12"
          height="14"
          viewBox="0 0 12 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.1377 6.01243C11.8044 6.39733 11.8044 7.35958 11.1377 7.74448L1.83567 13.115C1.16901 13.4999 0.335672 13.0188 0.335672 12.249L0.335672 1.50793C0.335672 0.738131 1.16901 0.257004 1.83567 0.641904L11.1377 6.01243Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
