import React from 'react';
import styles from './styles.module.scss';
import img from '../../../../Assets/sprites/cardpack01.png';
import Button from '../../../../Global-Components/Button';

const CardDetail = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <img src={img} alt="pack" />
      </div>
      <div className={styles.text}>
        <h3 className={styles.rare}>
          Rare Series 1 Release 1 - Drop 1 <br /> 295 Pack Left
        </h3>
        <p>You will be able to obtain the following through this pack:</p>
        <ul>
          <li>
            1 Rare Skin
          </li>
          <li>
            2 Common Skin
          </li>
        </ul>
        <h3 className={styles.price}>Price 100,000 NCoin</h3>
        <Button title="JOIN DROP" />
      </div>
    </div>
  );
};

export default CardDetail;
