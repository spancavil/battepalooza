import { SearchBar } from "./components/SearchBar";
import { Filters } from "./components/Filters";
import { Orders } from "./components/Orders";

import styles from "./styles.module.scss";

export const UpMenu = ({
  setFilters,
  filters,
  desktop,
  orderBy,
  setOrderBy,
}) => {
  return (
    <div className={styles.upMenu}>
      <Filters filters={filters} setFilters={setFilters} />
      <div className={styles.right}>
        <SearchBar filters={filters} setFilters={setFilters} />
        {desktop && <Orders orderBy={orderBy} setOrderBy={setOrderBy} />}
      </div>
    </div>
  );
};
