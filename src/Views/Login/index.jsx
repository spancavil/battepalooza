import React from 'react';
import {Link} from 'react-router-dom';
import Button from '../../Global-Components/Button';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import SubMessage from '../../Global-Components/SubMessage';
import styles from './styles.module.scss';

const Login = () => {
  return (
    <Modal title="LOGIN">
      <Input label="Email" width="32vw" type="email" />
      <Button title="GET CODE" />
      <SubMessage
        text="Do not have an account?"
        link="/signup"
        textLink="Sign up"
      />
    </Modal>
  );
};

export default Login;
