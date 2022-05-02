import React, { useEffect, useState } from "react";
import Background from "../../Global-Components/Background";
import marketService from "../../Services/market.service";
import Filters from "./components/Filters";
import Products from "./components/Products";
import SearchBar from "./components/SearchBar";
import { logOutAmplitude } from "../../Utils/amplitude";

import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import { TYPE_NFT, CLONE_COUNT, ORDER_BY } from "./Constants";
import { fireAlertAsync } from "../../Utils/sweetAlert2";
import OrderBy from "./components/OrderBy";
import { useMediaQuery } from "../../Hooks/useMediaQuery";

const MarketPlace = () => {
  const [filters, setFilters] = useState({});
  const [orderBy, setOrderBy] = useState({});
  const [page, setPage] = useState(1);
  const [xPage, setxPage] = useState(25);
  const [input, setInput] = useState(1);
  const [maintenance, setMaintenance] = useState(true);
  const [msj, setMsj] = useState(true);

  const desktop = useMediaQuery("(min-width: 1200px)");
  console.log(desktop);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const response = await marketService.getData();
        if (response.error.text !== "") {
          if (response.error.text.includes("authorized")) {
            fireAlertAsync(
              "Warning",
              "Session expired, please login again."
            ).then(() => {
              localStorage.removeItem("userBP");
              logOutAmplitude();
              history.push("/");
              window.location.reload();
            });
          } else {
            fireAlertAsync(response.error?.text).then(() => {
              history.push("/");
            });
          }
        }

        let rarityItem = {};
        response.rarityList.forEach((rarity) => {
          Object.defineProperty(rarityItem, rarity.name, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: false,
          });
        });
        //Tendrá todos los filtros
        setFilters({
          ...rarityItem,
          ...TYPE_NFT,
          ...CLONE_COUNT,
          search: "",
        });

        setOrderBy({
          ...ORDER_BY,
        });
      } catch (error) {
        fireAlertAsync("Error: ", error.message);
        return;
      }
    })();
  }, [setFilters, history]);

  console.log(filters);

  return (
    <Background>
      <div className={styles.container}>
        {maintenance && (
          <span className={styles.maintenance}>
            Blockchain under maintenance. We will be back soon!
          </span>
        )}
        <div className={styles.subContainer}>
          <div className={styles.filtersAndOrder}>
            <Filters
              input={input}
              setInput={setInput}
              setPage={setPage}
              filters={filters}
              setFilters={setFilters}
            />
            {desktop && <OrderBy orderBy={orderBy} setOrderBy={setOrderBy} />}
          </div>
          <div className={styles.products}>
            <SearchBar
              onChange={(value) => setFilters({ ...filters, search: value })}
            />
            <Products
              filters={filters}
              orderBy={orderBy}
              page={page}
              setPage={setPage}
              xPage={xPage}
              setxPage={setxPage}
              input={input}
              setInput={setInput}
            />
          </div>
        </div>
      </div>
      {maintenance && msj && (
        <div className={styles.msj}>
          <span>
            Blockchain under maintenance. <br /> We will be back soon!
          </span>
          <svg
            onClick={() => {
              setMaintenance(false);
              setMsj(false);
            }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.75 5.25L5.25 18.75"
              stroke="#121212"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.75 18.75L5.25 5.25"
              stroke="#121212"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      )}
    </Background>
  );
};

export default MarketPlace;
