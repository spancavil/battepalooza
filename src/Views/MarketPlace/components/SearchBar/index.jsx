import React, {useState} from 'react';
import styles from './styles.module.scss';

const SearchBar = ({onChange}) => {
  const [search, setSearch] = useState ('');

  const handleChange = e => {
    setSearch (e.target.value);
    onChange (e.target.value.toLowerCase())
  };

  return (
    <form className={styles.form} onSubmit={e => e.preventDefault()}>
      <input
        value={search}
        name={search}
        onChange={handleChange}
        placeholder="SEARCH..."
      />
    </form>
  );
};

export default SearchBar;
