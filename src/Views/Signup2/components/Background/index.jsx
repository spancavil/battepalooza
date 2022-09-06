import React from "react";
import styles from "./styles.module.scss";

const Background = ({ children }) => {
  return <div className={styles.layoutContainer}>{children}</div>;
};

export default Background;
