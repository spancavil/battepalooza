import React from 'react';
import {buttonStyle} from './styles.module.scss';

/**
 * Represents a generic button
 * @param {title, styles, callback} 
 */

const Button = ({title, style, onClick}) => {
  return (
    <button className={buttonStyle} style={{style}} onClick={()=>onClick}>
      {title}
    </button>
  );
};

export default Button;
