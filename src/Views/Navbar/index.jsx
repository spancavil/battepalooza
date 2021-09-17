import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../Global-Components/Button';

import { Links } from './links';
import Logo from '../../Assets/Logo.png';
import { navStyle, btnContainer } from './styles.module.scss';

const NavBar = () => {
  return (
    <nav className={navStyle}>
      <Link to="/">
        <img src={Logo} alt="Battle Palooza" />
      </Link>

      <ul>
        {Links.map(({ path, title }) => (
          <li key={title}>
            <Link to={path}>
              {title}
            </Link>
          </li>
        ))}
      </ul>

      <div className={btnContainer}>
        <Link to = "/login">
          <Button title="LOGIN" />
        </Link>
        <Link to = "/signup">
          <Button title="SIGN UP" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
