import React, { useState } from "react";
import Order from "./Order";
import styles from "./styles.module.scss";

const OrderBy = ({ orderBy, setOrderBy }) => {
  const [hideOrderBy, setHideOrderBy] = useState(true);

  const handleChange = (value) => {
    const newOrderArray = Object.keys(orderBy).map((key) => {
      if (key === value) {
        return { [key]: true };
      } else return { [key]: false };
    });

    const newOrder = {};
    for (const value of newOrderArray) {
      newOrder[Object.keys(value)[0]] = Object.values(value)[0];
    }

    setOrderBy(newOrder);
    setHideOrderBy(true);
  };
  return (
    <div className={styles.parentContainer}>
      <div
        className={styles.orderByContainer}
        onClick={() => setHideOrderBy(!hideOrderBy)}
      >
        <div className={styles.title}>
          <h2>Order By</h2>
          <h3>{hideOrderBy ? "+" : "-"}</h3>
        </div>
        {!hideOrderBy && (
          <div className={styles.filtersContainer}>
            {Object.keys(orderBy).map((key) => {
              return <Order name={key} onClick={handleChange} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBy;
