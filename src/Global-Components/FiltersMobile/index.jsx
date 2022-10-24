import DropdownSection from "../../Global-Components/DropdownSection";
import { Orders } from "../UpMenu/components/Orders";
import CheckFilters from "./components/CheckFilters";
import RarityFilters from "./components/RarityFilters";

import styles from "./styles.module.scss";

export const FiltersMobile = ({
  resetFilters,
  setInput,
  setPage,
  filters,
  setFilters,
  activeFilters,
  filterTypes,
  setOrderBy,
  viewFiltersMobile,
}) => {
  const onChangeRarity = (name) => {
    setFilters({ ...filters, [name]: !filters[name] });
    setPage(1);
    setInput(1);
  };

  const onChangeChecks = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.checked });
    setPage(1);
    setInput(1);
  };

  return (
    <div className={styles.leftMenu}>
      <div className={styles.title}>
        <button onClick={viewFiltersMobile} className={styles.button}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27 16H5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 7L5 16L14 25"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <p>Filter</p>
        <span onClick={resetFilters}>Reset</span>
        <button className={styles.activeFilters}>
          <span>{activeFilters}</span>
        </button>
      </div>
      <div className={styles.ordersContainer}>
        <Orders orderBy={filterTypes?.orderBy} setOrderBy={setOrderBy} />
      </div>
      <DropdownSection
        title={"Rarity"}
        children={<RarityFilters filters={filters} onChange={onChangeRarity} />}
      />
      {!filters.Weapon && (
        <DropdownSection
          title={"Character"}
          children={
            <CheckFilters
              filters={filters}
              filterType={filterTypes.characters}
              onChange={onChangeChecks}
            />
          }
        />
      )}
      {!filters.Character && (
        <DropdownSection
          title={"Weapon"}
          children={
            <CheckFilters
              filters={filters}
              filterType={filterTypes.weapons}
              onChange={onChangeChecks}
            />
          }
        />
      )}
      <DropdownSection
        title={"Left time to P2E"}
        children={
          <CheckFilters
            filters={filters}
            filterType={filterTypes.p2e}
            onChange={onChangeChecks}
          />
        }
      />
      <DropdownSection
        title={"Premium Buff"}
        children={
          <CheckFilters
            filters={filters}
            filterType={filterTypes.premiumBuffs}
            onChange={onChangeChecks}
          />
        }
      />
    </div>
  );
};
