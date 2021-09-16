import React from 'react';
import {buttonStyle} from './styles.module.scss';

const ButtonNavbar = ({title, bg, color}) => {
  return (
    <button className={buttonStyle} style={{backgroundColor: `${bg}`, color: `${color}`}}>
      {title}
    </button>
  );
};

export default ButtonNavbar;
