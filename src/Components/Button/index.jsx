import React from 'react';
import {button} from './styles.module.css';

const ButtonNavbar = ({title, bg, color}) => {
  return (
    <button className={button} style={{backgroundColor: `${bg}`, color: `${color}`}}>
      {title}
    </button>
  );
};

export default ButtonNavbar;
