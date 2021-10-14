import React from 'react';
import {useHistory} from 'react-router-dom';
import Background from '../../Global-Components/Background';
import CollectionPacks from '../Collection/Components/CollectionPacks';
import styles from './styles.module.scss';

const MyPacks = () => {
    const history = useHistory()

  const goBack = () => {
    history.goBack ();
  };
  return (
    <Background>
      <div className={styles.container}>
        <div className={styles.content}>
          <p onClick={goBack} className={styles.back}>&#60; Go back</p>
          <p className={styles.title}>PACK</p>
          <div className={styles.rectangle}>
            <CollectionPacks flex='1' />
          </div>
        </div>
      </div>
    </Background>
  );
};

export default MyPacks;
