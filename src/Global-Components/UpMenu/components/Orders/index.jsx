import { useState } from "react";
import OrdersIcon from "../../../../Assets/svg/OrdersIcon";
import Order from "./Order";
import styles from "./styles.module.scss";

export const Orders = ({ orderBy, setOrderBy }) => {
  const [title, setTitle] = useState(null);
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

    setTitle(value);
    setOrderBy(newOrder);
    setHideOrderBy(true);
  };

  return (
    <div
      className={styles.ordersContainer}
      onClick={() => setHideOrderBy(!hideOrderBy)}
    >
      <div className={styles.container}>
        <div className={hideOrderBy ? styles.orderClose : styles.orderOpen}>
          <span>{title ? title : "Order By"}</span>
          <OrdersIcon />
        </div>
        {!hideOrderBy && (
          <div className={styles.orders}>
            {Object.keys(orderBy).map((key) => {
              return <Order name={key} key={key} onClick={handleChange} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
