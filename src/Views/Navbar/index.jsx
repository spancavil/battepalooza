import React from 'react';
import {Link} from 'react-router-dom';
import ButtonNavbar from '../../Components/Button';
import {Links} from './links';
import {links} from './styles.module.css'

const NavBar = () => {
  return (
    <div>
      {/* Aca iria el logo */}
      <img src="" alt="" />

      <ul className={links}>
        {Links.map (({path, title}) => (
          <li>
            <Link to={path}>
              {title}
            </Link>
          </li>
        ))}
      </ul>

      <ButtonNavbar title="Login" bg="#212739" color="#FFFFFF" />
      <ButtonNavbar title="Sign Up" bg="#FFFFFF" color="#212739" />
    </div>
  );
};

export default NavBar;
