import { useEffect, useState } from "react";
import Background from "../../Global-Components/Background";
import marketService from "../../Services/market.service";
import Products from "./components/Products";
import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import { TYPE_NFT, CLONE_COUNT, ORDER_BY } from "./Constants";
import { fireAlertAsync } from "../../Utils/sweetAlert2";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import checkErrorMiddleware from "../../Utils/checkErrorMiddleware";
import { UpMenu } from "./components/UpMenu";
import { LeftMenu } from "./components/LeftMenu";
import Footer from "../../Global-Components/Footer";

const MarketPlace = () => {
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState(0);
  const [orderBy, setOrderBy] = useState({});
  const [page, setPage] = useState(1);
  const [xPage, setxPage] = useState(25);
  const [input, setInput] = useState(1);

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
            search: "",
          });

          setOrderBy({
            ...ORDER_BY,
          });
        }
      } catch (error) {
        fireAlertAsync("Error: ", error.message);
        return;
      }
    })();
  }, [setFilters, history]);

  //Effect for count active filters
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
          <div className={styles.products}>
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
      <Footer />
    </Background>
  );
};

export default MarketPlace;
