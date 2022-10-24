import { useEffect, useState, useContext } from "react";
import Background from "../../Global-Components/Background";
import Products from "./components/Products";
import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import {
  TYPE_NFT,
  CLONE_COUNT,
  ORDER_BY,
  P2E_ORDER_BY,
} from "../../Constants/Filters";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import { UpMenu } from "../../Global-Components/UpMenu";
import { LeftMenu } from "../../Global-Components/LeftMenu";
import Footer from "../../Global-Components/Footer";
import { makeCheckableObject } from "../../Utils/objectUtilities";
import { NftData } from "../../Context/NftProvider";
import useFetchMarket from "../../Hooks/useFetchMarket";
import { fireAlert } from "../../Utils/sweetAlert2";
import { FiltersMobile } from "../../Global-Components/FiltersMobile";

const MarketPlace = () => {
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState(0);
  const [page, setPage] = useState(1);
  const [nftPerPage, setNftPerPage] = useState(25);
  const [input, setInput] = useState(1);
  const [filterTypes, setFilterTypes] = useState({});
  const [filtersMobileOpen, setFiltersMobileOpen] = useState(false);

  const { rarityStatic, repIdStatic, premiumStatic, maintenace } =
    useContext(NftData);

  const desktop = useMediaQuery("(min-width: 1200px)");
  const history = useHistory();

  const [nfts, loading, error] = useFetchMarket(
    filters,
    filterTypes,
    page,
    nftPerPage
  );
  if (error) fireAlert("Oops, an error ocurred", error.message, "500px");

  //Maintenance alert
  if (maintenace)
    fireAlert(
      "System under maintenance",
      `Start time: ${maintenace?.start?.toLocaleDateString()}. End time: ${maintenace?.end?.toLocaleDateString()}`,
      "500px"
    );

  //Set filters
  useEffect(() => {
    if (rarityStatic.length && repIdStatic.length && premiumStatic.length) {
      const rarityItem = makeCheckableObject(
        rarityStatic.filter((rarity) => rarity.name !== "None")
      );
      const characterItem = makeCheckableObject(
        repIdStatic.filter((item) => item.goodsType === 1)
      );
      const weaponItem = makeCheckableObject(
        repIdStatic.filter((item) => item.goodsType === 2)
      );
      const premiumItem = makeCheckableObject(
        premiumStatic.map((buff) => {
          return { name: buff.engName };
        })
      );
      setFilterTypes({
        weapons: weaponItem,
        characters: characterItem,
        rarities: rarityItem,
        cloneCount: CLONE_COUNT,
        premiumBuffs: premiumItem,
        p2e: P2E_ORDER_BY,
        orderBy: ORDER_BY,
      });
      //Tendrá todos los filtros
      setFilters({
        ...rarityItem,
        ...TYPE_NFT,
        ...CLONE_COUNT,
        ...P2E_ORDER_BY,
        ...ORDER_BY,
        ...weaponItem,
        ...characterItem,
        ...premiumItem,
      });
    }
  }, [setFilters, history, rarityStatic, repIdStatic, premiumStatic]);

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
    setSearch("");
    setFilters(filtros);
  };

  const setOrderBy = (newOrder) => {
    setFilters({ ...filters, ...newOrder });
  };

  return (
    <Background>
      <div className={styles.container}>
        <UpMenu
          search={search}
          setSearch={setSearch}
          filterTypes={filterTypes}
          filters={filters}
          setFilters={setFilters}
          desktop={desktop}
          setOrderBy={setOrderBy}
          viewFiltersMobile={() => setFiltersMobileOpen(!filtersMobileOpen)}
        />
        {!desktop && filtersMobileOpen && (
          <FiltersMobile
            viewFiltersMobile={() => setFiltersMobileOpen(!filtersMobileOpen)}
            resetFilters={resetFilters}
            setInput={setInput}
            setPage={setPage}
            filters={filters}
            setFilters={setFilters}
            activeFilters={activeFilters}
            filterTypes={filterTypes}
            desktop={desktop}
            setOrderBy={setOrderBy}
          />
        )}

        <div className={styles.subContainer}>
          {desktop && (
            <LeftMenu
              resetFilters={resetFilters}
              setInput={setInput}
              setPage={setPage}
              filters={filters}
              setFilters={setFilters}
              activeFilters={activeFilters}
              filterTypes={filterTypes}
              desktop={desktop}
            />
          )}
          <div className={styles.products}>
            <Products
              page={page}
              setPage={setPage}
              nftPerPage={nftPerPage}
              setNftPerPage={setNftPerPage}
              input={input}
              setInput={setInput}
              filterTypes={filterTypes}
              nfts={nfts}
              loading={loading}
              error={error}
              search={search}
              activeFilters={activeFilters}
            />
          </div>
        </div>
      </div>
      <Footer />
    </Background>
  );
};

export default MarketPlace;
