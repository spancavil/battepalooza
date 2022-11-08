import React, { useState } from 'react';
import styles from './styles.module.scss';

const PackCounter = ({handleValue, additionalStyles = null}) => {
  const [count, setCount] = useState(1);

  const onAdd = () => {
    if (count < 10) {
      setCount(count + 1)
      handleValue (count + 1)
    }
  }

  const onDecrement = () => {
    if (count > 1) {
      setCount (count - 1)
      handleValue (count - 1)
    }
  }

  return (
    <div 
      className={styles.countContainer}
      style = {{...additionalStyles}}
    >
      <button className={styles.plusButton} onClick={onDecrement}>-</button>
      <span className={styles.quantity}>{count}</span>
      <button className={styles.plusButton} onClick={onAdd}>+</button>
    </div>
  )
}

export default PackCounter