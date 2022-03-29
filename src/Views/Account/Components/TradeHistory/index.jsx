import { useState, useEffect } from "react";
import Pagination from "../../../../Global-Components/Pagination";
import { useMediaQuery } from "../../../../Hooks/useMediaQuery";
import { TradeDataDummy } from "../../Data";

import styles from "./styles.module.scss";

const TradeHistory = ({ page, setPage, setxPage, xPage, input, setInput }) => {
  const [category, setCategory] = useState("purchase");

  const breakpoint = useMediaQuery("(max-width: 576px)");

  useEffect(() => {
    setInput(1);
    setPage(1);
  }, [breakpoint, setxPage, setInput, setPage]);

  const max = TradeDataDummy.length / xPage;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p className={styles.title}>Trade History</p>
        <div className={styles.categories}>
          <span
            onClick={() => setCategory("purchase")}
            className={category === "purchase" ? styles.active : ""}
          >
            Purchase
          </span>
          <span
            onClick={() => setCategory("sold")}
            className={category === "sold" ? styles.active : ""}
          >
            Sold
          </span>
        </div>
      </div>

      <div className={styles.trades}>
        {TradeDataDummy.slice(
          (page - 1) * xPage,
          (page - 1) * xPage + xPage
        ).map((trade, i) => (
          <div key={i} className={styles.tradeContainer}>
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
                <p>{category === "purchase" ? "Seller" : "Buyer"} </p>
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
        ))}
      </div>

      <div className={styles.pagination}>
        <Pagination
          page={page}
          setPage={setPage}
          xPage={xPage}
          setxPage={setxPage}
          input={input}
          setInput={setInput}
          max={max}
        />
      </div>
    </div>
  );
};

export default TradeHistory;
