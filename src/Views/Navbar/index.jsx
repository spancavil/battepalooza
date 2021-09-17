import React from 'react';
import {Link} from 'react-router-dom';
import {Links} from './links';
import Logo from '../../Assets/Logo.png';
import styles from './styles.module.scss';

const NavBar = () => {
  return (
    <nav className={styles.navStyle}>
      <Link to="/">
        <img src={Logo} alt="Battle Palooza" />
      </Link>

      <ul>
        {Links.map (({path, title}) => (
          <li key={title}>
            <Link to={path}>
              {title}
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
    </nav>
  );
};

export default NavBar;
