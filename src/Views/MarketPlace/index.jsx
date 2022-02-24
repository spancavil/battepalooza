import React, { useEffect, useState } from "react";
import Background from "../../Global-Components/Background";
import marketService from "../../Services/market.service";
import Filters from "./components/Filters";
import Products from "./components/Products";
import SearchBar from "./components/SearchBar";
import { logOutAmplitude } from "../../Utils/amplitude";

import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import { TYPE_NFT, NCOIN_BATTLECOUNT, ORDER_BY } from "../Constants";
import { fireAlertAsync } from "../../Utils/sweetAlert2";
import OrderBy from "./components/OrderBy";

const MarketPlace = () => {
  const [filters, setFilters] = useState({});
  const [orderBy, setOrderBy] = useState({})
  const [page, setPage] = useState(1);
  const [xPage, setxPage] = useState(25);
  const [input, setInput] = useState(1);

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
          ...NCOIN_BATTLECOUNT,
          search: "",
        });
        setOrderBy({
          ...ORDER_BY
        })
      } catch (error) {
        alert(error.message);
        return;
      }
    })();
  }, [setFilters, history]);

  return (
    <Background>
      <div className={styles.container}>
        <Filters
          input={input}
          setInput={setInput}
          setPage={setPage}
          filters={filters}
          setFilters={setFilters}
        />
        <div className={styles.products}>
          <div className={styles.search}>
            <SearchBar
              onChange={(value) => setFilters({ ...filters, search: value })}
            />
            <OrderBy
              orderBy={orderBy}
              setOrderBy = {setOrderBy}
            />
          </div>
          <Products
            filters={filters}
            orderBy = {orderBy}
            page={page}
            setPage={setPage}
            xPage={xPage}
            setxPage={setxPage}
            input={input}
            setInput={setInput}
          />
        </div>
      </div>
    </Background>
  );
};

export default MarketPlace;
