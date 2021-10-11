import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../Global-Components/Button';
import Modal from '../../Global-Components/Modal';
import styles from './styles.module.scss';

const NeedLogin = () => {

  const history = useHistory()
  const handleClose = () => {
    history.push('/')
  }

  return (
    <div className={styles.container}>
      <Modal title="NEED LOGIN" handleClose = {handleClose}>
        <span className={styles.text}>You need to login in order to proceed.</span>
        <div className={styles.btns}>
          <Link to="/login">
            <Button title="LOGIN" />
          </Link>
          <Link to="/signup">
            <Button title="SIGN UP" />
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default NeedLogin;
