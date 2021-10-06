import React from 'react';
import Background from '../../Global-Components/Background';
import SocialMedia from '../Home/Components/SocialMedia';
import CardDetail from './Components/CardDetail';
import styles from './styles.module.scss';

const PackDetail = () => {
  return (
    <Background>
      <div className={styles.container}>
        <CardDetail />
      </div>
      <SocialMedia />
    </Background>
  );
};

export default PackDetail;
