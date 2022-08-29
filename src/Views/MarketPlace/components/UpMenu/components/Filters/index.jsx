import CharactersIcon from "../../../../../../Assets/svg/CharactersIcon";
import WeaponsIcon from "../../../../../../Assets/svg/WeaponsIcon";
import SquareIcon from "../../../../../../Assets/svg/SquareIcon";

import styles from "./styles.module.scss";

export const Filters = ({ filters, setFilters }) => {
  const isActive = (filter) =>
    filters?.[filter] ? styles.filterActive : styles.filter;

  const resetFilters = () => {
    setFilters({ ...filters, Character: false, Weapon: false });
  };

  const selectCharacter = () => {
    setFilters({ ...filters, Character: !filters.Character, Weapon: false });
  };

  const selectWeapon = () => {
    setFilters({ ...filters, Character: false, Weapon: !filters.Weapon });
  };

  return (
    <div className={styles.filters}>
      <div
        onClick={resetFilters}
        className={
          filters?.Character || filters?.Weapon
            ? styles.filter
            : styles.filterActive
        }
      >
        <SquareIcon />
        <span>All</span>
      </div>

      <div onClick={selectCharacter} className={isActive("Character")}>
        <CharactersIcon />
        <span>Characters</span>
      </div>

      <div onClick={selectWeapon} className={isActive("Weapon")}>
        <WeaponsIcon />
        <span>Weapons</span>
      </div>
    </div>
  );
};
