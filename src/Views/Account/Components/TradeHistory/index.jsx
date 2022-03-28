import { useState } from "react";
import { TradeDataDummy } from "../../Data";

import styles from "./styles.module.scss";

const TradeHistory = () => {
  const [category, setCategory] = useState("purchase");

  console.log(TradeDataDummy);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p className={styles.title}>Trade History</p>
        <div className={styles.categories}>
          <span
            onClick={() => setCategory("purchase")}
            className={category === "purchase" && styles.active}
          >
            Purchase
          </span>
          <span
            onClick={() => setCategory("sold")}
            className={category === "sold" && styles.active}
          >
            Sold
          </span>
        </div>
      </div>

      <div className={styles.trades}>
        {TradeDataDummy.map((trade) => (
          <>
            <div className={styles.tradeContainer}>
              <div className={styles.trade}>
                <div className={styles.item}>
                  <p>Date</p>
                  <span>{trade.date}</span>
                </div>

                <div className={styles.item}>
                  <p>Name</p>
                  <span>{trade.name}</span>
                </div>

                <div className={styles.item}>
                  <p>Buyer</p>
                  <span>{trade.buyer}</span>
                </div>

                <div className={styles.item}>
                  <p>Price</p>
                  <span>{trade.price} NCoin</span>
                </div>

                <button>VIEW</button>
              </div>

              <div className={styles.line} />
            </div>
          </>
        ))}
      </div>

      <div className={styles.pagination} />
    </div>
  );
};

export default TradeHistory;
