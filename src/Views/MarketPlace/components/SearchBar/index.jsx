import React, {useState} from 'react';
import styles from './styles.module.scss';

const SearchBar = () => {
  const [search, setSearch] = useState ('');

  const onChange = e => {
    setSearch (e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault ();
    setSearch ('');
  };

  return (
    <form className={styles.form} onSubmit={e => onSubmit (e)}>
      <input
        value={search}
        name={search}
        onChange={e => onChange (e)}
        placeholder="SEARCH..."
      />
    </form>
  );
};

export default SearchBar;
