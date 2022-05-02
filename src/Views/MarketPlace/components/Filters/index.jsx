import React, { useState } from "react";
import FilterIcon from "../../../../Assets/svg/FilterIcon";
import { useMediaQuery } from "../../../../Hooks/useMediaQuery";
import { sliceObject } from "../../../../Utils/sliceObject";
import Filter from "./Filter";
import styles from "./styles.module.scss";

const Filters = ({ filters, setFilters, setPage, input, setInput }) => {
  const breakpoint = useMediaQuery("(max-width: 1199px)");
  const [menu, setMenu] = useState(false);
  const [menuRarity, setMenuRarity] = useState(false);
  const [menuNCoin, setMenuNCoin] = useState(false);
  const [menuType, setMenuType] = useState(false);

  const filtersRarity = sliceObject(filters, 7, 11)

  const filtersType = sliceObject(filters, 11, 13)

  const filtersCloneCount = sliceObject(filters, 0, 7);

  console.table(filters["COMMON"]);

  const onChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.checked });
    setPage(1);
    setInput(1);
  };

  return breakpoint ? (
    <>
      <div onClick={() => setMenu(!menu)} className={styles.btnFilter}>
        <FilterIcon />
      </div>
      {menu && (
        <div className={styles.menuFilter}>
          <h2>FILTERS</h2>
          <div className={styles.filtersMobile}>
            {Object.keys(filters).map((key) => {
              return (
                <Filter
                  key={key}
                  name={key}
                  value={filters[key]}
                  onChange={onChange}
                />
              );
            })}
          </div>
        </div>
      )}
      {menu && <div onClick={() => setMenu(false)} className={styles.bg}></div>}
    </>
  ) : (
    <div className={styles.container}>
      <div className={styles.title} onClick={() => setMenuRarity(!menuRarity)}>
        <h2>Rarity</h2>
        <h3>{menuRarity ? "-" : "+"}</h3>
      </div>
      {menuRarity && (
        <div className={styles.filters}>
          {Object.keys(filtersRarity).map((key) => {
            return (
              <Filter
                key={key}
                name={key}
                value={filters[key]}
                onChange={onChange}
              />
            );
          })}
        </div>
      )}

      <div className={styles.title} onClick={() => setMenuNCoin(!menuNCoin)}>
        <h2>Cloning Count</h2>
        <h3>{menuNCoin ? "-" : "+"}</h3>
      </div>
      {menuNCoin && (
        <div className={styles.filters}>
          {Object.keys(filtersCloneCount).map((key) => {
            return (
              <Filter
                key={key}
                name={key}
                value={filters[key]}
                onChange={onChange}
              />
            );
          })}
        </div>
      )}

      <div className={styles.title} onClick={() => setMenuType(!menuType)}>
        <h2>Type</h2>
        <h3>{menuType ? "-" : "+"}</h3>
      </div>
      {menuType && (
        <div className={styles.filters}>
          {Object.keys(filtersType).map((key) => {
            return (
              <Filter
                key={key}
                name={key}
                value={filters[key]}
                onChange={onChange}
              />
            );
          })}
        </div>
      )}  
      
    </div>
  );
};

export default Filters;
