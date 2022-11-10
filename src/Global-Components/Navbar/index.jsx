import { HamburgerMenu } from "./components/HamburgerMenu";
import { logOutAmplitude } from "../../Utils/amplitude";
import { UserData } from "../../Context/UserProvider";
import { MenuMobile } from "./components/MenuMobile";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ButtonNav } from "./components/ButtonNav";
import { Profile } from "./components/Profile";
import { Ncoins } from "./components/Ncoins";
import { useContext, useEffect, useState } from "react";
import { Links } from "./components/Links";

import styles from "./styles.module.scss";
import Logo from "../../Assets/Logo.png";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { userData, setGameNavigate, gameNavigate } = useContext(UserData);
  
  const toggleMenu = () => setMenu(menu => !menu)
  const user = Object.keys(userData).length > 0;

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(()=> {
    if (gameNavigate) setMenu(false)
  }, [gameNavigate])

  const logout = () => {
    localStorage.removeItem("userBP");
    logOutAmplitude();
    history.push("/");
    window.location.reload();
  };

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  const handleBrandNavigate = () => {
    setGameNavigate(false)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer} onClick={handleBrandNavigate}>
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
              <ButtonNav
                to="/"
                text="Log out"
                onClick={logout}
                bgColor="#313131"
              />
            ) : (
              <ButtonNav text="Login" to="/auth/login" />
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
