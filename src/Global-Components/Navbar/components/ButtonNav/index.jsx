import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

export const ButtonNav = ({ text, onClick, to, bgColor, textColor }) => {
  return (
    <Link to={to}>
      <button
        style={{
          backgroundColor: bgColor && bgColor,
          color: bgColor && "white",
        }}
        className={styles.buttonNav}
        onClick={onClick}
      >
        <span>{text}</span>
      </button>
    </Link>
  );
};
