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
}) => {
  const setOrderBy = (newOrder) => {
    setFilters({...filters, ...newOrder})
  }
  return (
    <div className={styles.upMenu}>
      <Filters filters={filters} setFilters={setFilters} />
      <div className={styles.right}>
        <SearchBar search={search} setSearch={setSearch}/>
        {desktop && <Orders orderBy={filterTypes?.orderBy} setOrderBy={setOrderBy} />}
      </div>
    </div>
  );
};
