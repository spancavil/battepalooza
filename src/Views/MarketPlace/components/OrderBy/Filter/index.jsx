import React from 'react';
// import styles from './styles.module.scss';

const Filter = ({name, onClick}) => {
  return (
    <div onClick={()=> onClick(name)}>
        <h2>{name}</h2>
    </div>
  )
}

export default Filter;