import CloningCountFilters from "./components/CloningCountFilters";
import DropdownSection from "./components/DropdownSection";
import RarityFilters from "./components/RarityFilters";

import styles from "./styles.module.scss";

export const LeftMenu = ({
  resetFilters,
  setInput,
  setPage,
  filters,
  setFilters,
  activeFilters,
}) => {
  const onChangeRarity = (name) => {
    setFilters({ ...filters, [name]: !filters[name] });
    setPage(1);
    setInput(1);
  };

  const onChangeCloneCount = (e) => {
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
        title={"Cloning Count"}
        children={
          <CloningCountFilters
            filters={filters}
            onChange={onChangeCloneCount}
          />
        }
      />
    </div>
  );
};
