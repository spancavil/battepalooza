import React from 'react';
import {Link} from 'react-router-dom';
import {Links} from './links';
import Logo from '../../Assets/Logo.png';
import {navStyle, btnContainer} from './styles.module.scss';

const NavBar = () => {
  return (
    <nav className={navStyle}>
      <img src={Logo} alt="" />

      <ul>
        {Links.map (({path, title}) => (
          <li>
            <Link to={path}>
              {title}
            </Link>
          </li>
        ))}
      </ul>

      <div className={btnContainer}>
        {/* <ButtonNavbar title="Login" bg="#212739" color="#FFFFFF" />
        <ButtonNavbar title="Sign Up" bg="#FFFFFF" color="#212739" /> */}
      </div>
    </nav>
  );
};

export default NavBar;
