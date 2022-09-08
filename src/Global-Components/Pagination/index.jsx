import ArrowPagination from "../../Assets/svg/ArrowPagination";

import styles from "./styles.module.scss";

const Pagination = ({
  xPage,
  setxPage,
  page,
  setPage,
  max,
  input,
  setInput,
}) => {
  const nextPage = () => {
    setPage(parseInt(page) + 1);
    setInput(parseInt(input) + 1);
  };
  const previousPage = () => {
    setPage(parseInt(page) - 1);
    setInput(parseInt(input) - 1);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setPage(parseInt(e.target.value));
      if (
        parseInt(e.target.value) < 1 ||
        parseInt(e.target.value) > Math.ceil(max) ||
        isNaN(parseInt(e.target.value))
      ) {
        setPage(1);
        setInput(1);
      } else {
        setPage(parseInt(e.target.value));
      }
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      <button disabled={page === 1 || page < 1} onClick={previousPage}>
        <ArrowPagination className={styles.leftArrow} />
      </button>
      <input
        className={styles.input}
        onKeyDown={(e) => onKeyDown(e)}
        onChange={(e) => handleChange(e)}
        autoComplete="off"
        name="page"
        value={input}
      />
      <p>of</p>
      <input className={styles.inputDisabled} disabled value={Math.ceil(max)} />
      <button
        disabled={page === Math.ceil(max) || page > Math.ceil(max)}
        onClick={nextPage}
      >
        <ArrowPagination />
      </button>
    </div>
  );
};

export default Pagination;
