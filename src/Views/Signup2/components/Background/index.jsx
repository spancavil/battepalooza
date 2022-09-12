import React from "react";
import styles from "./styles.module.scss";

const Background = ({ children, showInfoSignup }) => {
  return <div className={showInfoSignup ? styles.layoutContainer2 : styles.layoutContainer}>{children}</div>;
};

export default Background;
