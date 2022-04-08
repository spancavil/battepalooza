import { useState, useEffect, useContext} from "react";
import Pagination from "../../../../Global-Components/Pagination";
import { useMediaQuery } from "../../../../Hooks/useMediaQuery";
import NftDetail from "../NftDetail";

import { TradeDataDummy } from "../../Data";

import styles from "./styles.module.scss";
import authService from "../../../../Services/auth.service";
import { UserData } from "../../../../Context/UserProvider";

const TradeHistory = ({ page, setPage, setxPage, xPage, input, setInput }) => {
  const [tradeDetail, setTradeDetail] = useState(false);
  const [category, setCategory] = useState("purchase");
  const [tradeData, setTradeData] = useState(null);
  const {userData} = useContext(UserData);

  const breakpoint = useMediaQuery("(max-width: 576px)");

  useEffect(() => {
    setInput(1);
    setPage(1);
  }, [breakpoint, setxPage, setInput, setPage]);

  const max = TradeDataDummy.length / xPage;

  useEffect(()=> {
    (async ()=> {
      const response = await authService.tradeHistoryList(userData.bpToken, userData.pid);
      console.log(response);
      const response2 = await authService.tradeHistoryDetail(userData.bpToken, userData.pid, "73e68ad6-bd8c-4a04-8f83-86c30da4d314");
      console.log(response2);
    })()
  }, [userData])

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
          <>
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

                <button onClick={() => setTradeDetail(true)}>VIEW</button>
              </div>

              <div className={styles.line} />
            </div>
            {tradeDetail && (
              <NftDetail
                chosenNft={trade}
                handleClose={() => setTradeDetail(false)}
              />
            )}
          </>
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
