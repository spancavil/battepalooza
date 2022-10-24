import { SearchBar } from "./components/SearchBar";
import { Filters } from "./components/Filters";
import { Orders } from "./components/Orders";

import styles from "./styles.module.scss";

export const UpMenu = ({
  search,
  setSearch,
  setFilters,
  filters,
  filterTypes,
  desktop,
  viewFiltersMobile,
  setOrderBy,
}) => {
  return (
    <div className={styles.upMenu}>
      <Filters filters={filters} setFilters={setFilters} />
      <div className={styles.right}>
        <SearchBar search={search} setSearch={setSearch} />
        {desktop && (
          <Orders orderBy={filterTypes?.orderBy} setOrderBy={setOrderBy} />
        )}
        {!desktop && (
          <button onClick={viewFiltersMobile} className={styles.viewFilter}>
            <p>Filter</p>
          </button>
        )}
      </div>
    </div>
  );
};
