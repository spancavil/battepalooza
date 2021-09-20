import React from 'react';
import Button from '../../Global-Components/Button';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import SubMessage from '../../Global-Components/SubMessage';

const Login = () => {
  return (
    <Modal title="LOGIN">
      <Input label="Email" width="32vw" type="email" />
      <div style={{paddingTop: '25px'}}>
        <Button title="GET CODE" />
      </div>
      <SubMessage
        text="Do not have an account?"
        link="/signup"
        textLink="Sign up"
      />
    </Modal>
  );
};

export default Login;
