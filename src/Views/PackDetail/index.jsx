import React, {useContext} from 'react';
import {Redirect} from 'react-router';
import {UserData} from '../../Context/UserProvider';
import Background from '../../Global-Components/Background';
import SocialMedia from '../Home/Components/SocialMedia';
import CardDetail from './Components/CardDetail';
import styles from './styles.module.scss';

const PackDetail = () => {
  const userStorage = JSON.parse (localStorage.getItem ('user'));

  return !userStorage
    ? <Redirect to="/" />
    : <Background>
        <div className={styles.container}>
          <CardDetail />
        </div>
        <SocialMedia />
      </Background>;
};

export default PackDetail;
