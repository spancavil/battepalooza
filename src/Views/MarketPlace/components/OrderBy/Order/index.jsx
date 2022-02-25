import React from "react";
import styles from "./styles.module.scss";

const Order = ({ name, onClick }) => {
  return (
    <div className={styles.order} onClick={() => onClick(name)}>
      <h2>{name}</h2>
    </div>
  );
};

export default Order;
