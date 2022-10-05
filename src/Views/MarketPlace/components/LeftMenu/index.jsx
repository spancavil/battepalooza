import DropdownSection from "../../../../Global-Components/DropdownSection";
import CheckFilters from "./components/CheckFilters";
import RarityFilters from "./components/RarityFilters";

import styles from "./styles.module.scss";

export const LeftMenu = ({
  resetFilters,
  setInput,
  setPage,
  filters,
  setFilters,
  activeFilters,
  filterTypes
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
        <p>Filter</p>
        <span onClick={resetFilters}>Reset</span>
        <button className={styles.activeFilters}>
          <span>{activeFilters}</span>
        </button>
      </div>
      <DropdownSection
        title={"Rarity"}
        children={<RarityFilters filters={filters} onChange={onChangeRarity} />}
      />
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
