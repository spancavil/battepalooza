import { useState } from "react";

import SearchIcon from "../../../../../../Assets/svg/SearchIcon";
import styles from "./styles.module.scss";

export const SearchBar = ({ filters, setFilters }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    setFilters({ ...filters, search: e.target.value.toLowerCase() });
  };

  return (
    <form className={styles.searchbar} onSubmit={(e) => e.preventDefault()}>
      <SearchIcon />
      <input
        value={search}
        name={search}
        onChange={handleChange}
        placeholder="Search..."
      />
    </form> 
  );
};
