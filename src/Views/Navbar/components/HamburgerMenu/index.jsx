import styles from "./styles.module.scss";

export const HamburgerMenu = ({ menu, toggleMenu }) => {
  return (
    <div
      className={menu === true ? styles.hamburgerActive : styles.hamburger}
      onClick={toggleMenu}
    >
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
    </div>
  );
};
