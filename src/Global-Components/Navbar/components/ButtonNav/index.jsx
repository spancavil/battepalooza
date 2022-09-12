import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

export const ButtonNav = ({ text, onClick, to }) => {
  return (
    <Link to={to}>
      <button className={styles.buttonNav} onClick={onClick}>
        <span>{text}</span>
      </button>
    </Link>
  );
};
