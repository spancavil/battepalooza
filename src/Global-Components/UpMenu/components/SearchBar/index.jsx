import SearchIcon from "../../../../Assets/svg/SearchIcon";
import styles from "./styles.module.scss";

export const SearchBar = ({ search, setSearch }) => {

  const handleChange = (e) => {
    setSearch(e.target.value);
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
