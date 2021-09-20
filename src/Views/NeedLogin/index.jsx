import React from 'react';
import Button from '../../Global-Components/Button';
import Modal from '../../Global-Components/Modal';
import styles from './styles.module.scss';

const NeedLogin = () => {
  return (
    <div className={styles.container}>
      <Modal title="NEED LOGIN">
        <span className={styles.text}>You need to login in order to proceed.</span>
        <div className={styles.btns}>
          <Button title="LOGIN" />
          <Button title="SIGN UP" />
        </div>
      </Modal>
    </div>
  );
};

export default NeedLogin;
