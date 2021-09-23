import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Links} from './links';
import Logo from '../../Assets/Logo.png';
import styles from './styles.module.scss';

const NavBar = () => {
  const [menu, setMenu] = useState (false);

  const onClick = e => {
    e.preventDefault ();
    setMenu (!menu);
  };

  return (
    <header className={menu === true ? styles.header : ''}>
      <nav className={styles.navbar}>
        <Link to="/">
          <img src={Logo} alt="Battle Palooza" />
        </Link>

        <ul className={menu === true ? styles.navMenuActive : styles.navMenu}>
          {Links.map (btn => (
            <li>
              <Link to={btn.path} className={styles.navLink}>
                {btn.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.btnContainer}>
          <Link to="/login">
            <button className={styles.login}>LOGIN</button>
          </Link>
          <Link to="/signup">
            <button className={styles.signUp}>SIGN UP</button>
          </Link>
        </div>

        <div
          className={menu === true ? styles.hamburgerActive : styles.hamburger}
          onClick={e => onClick (e)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </div>
      </nav>
    </header>
  );

};

export default NavBar;
