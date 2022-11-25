import React from "react";
import styles from "./styles.module.scss";

const ButtonRounded = ({
  color = "blue",
  title,
  onClick,
  additionalStyles,
}) => {
  const capitalize = (string) =>
    string.trim().replace(/^\w/, (c) => c.toUpperCase());

  return (
    <button
      onClick={onClick}
      className={styles[`button${capitalize(color)}`]}
      style={{ ...additionalStyles }}
    >
      {title}
    </button>
  );
};

export default ButtonRounded;
