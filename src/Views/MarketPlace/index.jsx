import { useEffect, useState } from "react";
import Background from "../../Global-Components/Background";
import marketService from "../../Services/market.service";
import Filters from "./components/Filters";
import Products from "./components/Products";
import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import { TYPE_NFT, CLONE_COUNT, ORDER_BY } from "./Constants";
import { fireAlertAsync } from "../../Utils/sweetAlert2";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import checkErrorMiddleware from "../../Utils/checkErrorMiddleware";
import { UpMenu } from "./components/UpMenu";

const MarketPlace = () => {
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState(0);
  const [orderBy, setOrderBy] = useState({});
  const [page, setPage] = useState(1);
  const [xPage, setxPage] = useState(25);
  const [input, setInput] = useState(1);
/*   const [maintenance, setMaintenance] = useState(false);
  const [msj, setMsj] = useState(true);
 */
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
        {/* {maintenance && (
                    <span className={styles.maintenance}>
                        Blockchain under maintenance. We will be back soon!
                    </span>
                )} */}
        <UpMenu
          filters={filters}
          setFilters={setFilters}
          desktop={desktop}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />

        <div className={styles.subContainer}>
          <div className={styles.filtersAndOrder}>
            <div className={styles.filtersCount}>
              <span>Filters</span>
              <span onClick={resetFilters}>Reset</span>
              <span>{activeFilters}</span>
            </div>
            <Filters
              input={input}
              setInput={setInput}
              setPage={setPage}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
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
      {/*  {maintenance && msj && (
                <div className={styles.msj}>
                    <span>
                        Blockchain under maintenance. <br /> We will be back
                        soon!
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
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M18.75 18.75L5.25 5.25"
                            stroke="#121212"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            )} */}
    </Background>
  );
};

export default MarketPlace;
