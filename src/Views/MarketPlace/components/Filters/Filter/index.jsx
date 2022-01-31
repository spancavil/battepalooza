import React from 'react';
import styles from './styles.module.scss'

const Filter = ({name, value, onChange}) => {
    
    return (
        <label className={styles.filter}>
            <input
              onChange={e => onChange (e)}
              value={value}
              type="checkbox"
              name={name}
              checked={value ?? true}
            />
            {name}
        </label>
    );
};

export default Filter;
