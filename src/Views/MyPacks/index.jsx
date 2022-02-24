import React from 'react';
import {useHistory} from 'react-router-dom';
import Background from '../../Global-Components/Background';
import CollectionPacks from '../Collection/Components/CollectionPacks';
import styles from './styles.module.scss';

/* NO SE ESTA USANDO ESTE COMPONENTE, E IBA EN LA RUTA /my-packs */
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
          <p className={styles.title}>MY PACKS</p>
          <div className={styles.rectangle}>
            <CollectionPacks flex='1' />
          </div>
        </div>
      </div>
    </Background>
  );
};

export default MyPacks;
