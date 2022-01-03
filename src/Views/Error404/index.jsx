import React from 'react';
import {useHistory} from 'react-router-dom';
import Background from '../../Global-Components/Background/index';
import Button from '../../Global-Components/Button';

import styles from './styles.module.scss';

const Error404 = () => {
  const history = useHistory ();

  const backToHome = () => {
    history.push ('/');
  };

  return (
    <Background>
      <div className={styles.container}>
        <h3>ERROR 404</h3>
        <h4>PAGE NOT FOUND</h4>
        <Button title={'BACK TO HOME'} onClick={backToHome} />
      </div>
    </Background>
  );
};

export default Error404;
