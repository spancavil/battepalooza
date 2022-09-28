import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Background from "../../Global-Components/Background";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import marketService from "../../Services/market.service";
import checkErrorMiddleware from "../../Utils/checkErrorMiddleware";
import { fireAlertAsync } from "../../Utils/sweetAlert2";
import { LeftMenu } from "../MarketPlace/components/LeftMenu";
import { UpMenu } from "../MarketPlace/components/UpMenu";
import { CLONE_COUNT, TYPE_NFT } from "../MarketPlace/Constants";
import CollectionNfts from "./Components/CollectionNfts";
import styles from "./styles.module.scss";

const Collection = () => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [xPage, setxPage] = useState(25);
  const [input, setInput] = useState(1);
  const [orderBy, setOrderBy] = useState({});
  const [activeFilters, setActiveFilters] = useState(0);

  const desktop = useMediaQuery("(min-width: 1200px)");
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const response = await marketService.getData();
        const canContinue = checkErrorMiddleware(response, history);
        if (canContinue) {
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
          });
        }
      } catch (error) {
        fireAlertAsync("Error: ", error.message);
        return;
      }
    })();
  }, [setFilters, history]);

  const resetFilters = () => {
    const filtros = { ...filters };
    for (const key in filtros) {
      if (Object.hasOwnProperty.call(filtros, key)) {
        filtros[key] = false;
      }
    }
    filtros.search = "";
    setFilters(filtros);
  };

  useEffect(() => {
    const filtersActive = { ...filters };
    delete filtersActive.search;
    delete filtersActive.Weapon;
    delete filtersActive.Character;
    let acc = 0;
    for (const filtro in filtersActive) {
      if (Object.hasOwnProperty.call(filtersActive, filtro)) {
        acc = acc + (filtersActive[filtro] ? 1 : 0);
      }
    }
    setActiveFilters(acc);
  }, [filters]);

  return (
    <Background>
      <div className={styles.container}>
        <UpMenu
          filters={filters}
          setFilters={setFilters}
          desktop={desktop}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />
        <div className={styles.subContainer}>
          <LeftMenu
            resetFilters={resetFilters}
            setInput={setInput}
            setPage={setPage}
            filters={filters}
            setFilters={setFilters}
            activeFilters={activeFilters}
          />
          <div className={styles.container}>
            <CollectionNfts
              filters={filters}
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
    </Background>
  );
};

export default Collection;
