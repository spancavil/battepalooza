import React from 'react';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import styles from './style.module.scss';

const SignUp = () => {
  return (
    <div>
      <Modal title = "Verification">
          <Input label="Email" width="458px" type="email" subtitle="Este es un sub de prueba"></Input>
      </Modal>
    </div>
  );
};

export default SignUp;
