import { Profile } from "../Profile";
import { Ncoins } from "../Ncoins";
import { Links } from "../Links";

import styles from "./styles.module.scss";

export const MenuMobile = ({ menu, user }) => {
  return (
    <div className={menu ? styles.menuActive : styles.menu}>
      {user && (
        <>
          <Profile />
          <Ncoins />
        </>
      )}
      <Links />
    </div>
  );
};
