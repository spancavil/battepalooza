import { HamburgerMenu } from "./components/HamburgerMenu";
import { logOutAmplitude } from "../../Utils/amplitude";
import { UserData } from "../../Context/UserProvider";
import { MenuMobile } from "./components/MenuMobile";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ButtonNav } from "./components/ButtonNav";
import { Profile } from "./components/Profile";
import { Ncoins } from "./components/Ncoins";
import { useCallback, useContext, useEffect, useState } from "react";
import { Links } from "./components/Links";

import styles from "./styles.module.scss";
import Logo from "../../Assets/Logo.png";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const toggleMenu = useCallback(() => setMenu(!menu), [menu]);

  const { userData } = useContext(UserData);
  const user = Object.keys(userData).length > 0;

  const history = useHistory();
  const { pathname } = useLocation();

  const logout = () => {
    localStorage.removeItem("userBP");
    logOutAmplitude();
    history.push("/");
    window.location.reload();
  };

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Link to={"/"}>
            <img src={Logo} alt="BattlePalooza" />
          </Link>
        </div>
        <div className={styles.left}>
          <div className={styles.onlyDesktop}>
            <Links />

            {user && (
              <>
                <Ncoins />
                <Profile />
              </>
            )}
          </div>

          <div className={styles.right}>
            {user ? (
              <ButtonNav text="Logout" to={"/"} onClick={logout} />
            ) : (
              <ButtonNav text="Login" to={"/auth/login"} />
            )}
            <HamburgerMenu menu={menu} toggleMenu={toggleMenu} />
          </div>
        </div>
      </nav>
      <MenuMobile menu={menu} user={user} />
    </>
  );
};

export default Navbar;
