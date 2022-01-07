import React, { useContext } from 'react';
import {useHistory} from 'react-router-dom';
import { UserData } from '../../Context/UserProvider';
import Background from '../../Global-Components/Background/index';
import Button from '../../Global-Components/Button';

import styles from './styles.module.scss';

const Error404 = () => {

  const {handleNavError404} = useContext(UserData);
  const history = useHistory ();
  handleNavError404(true);

  const backToHome = () => {
    handleNavError404(false);
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
