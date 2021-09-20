import React, {useState} from 'react';
import Button from '../../Global-Components/Button';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import SubMessage from '../../Global-Components/SubMessage';
import styles from './styles.module.scss';

const Login = () => {
  const [email, setEmail] = useState ('');

  const changeEmail = email => {
    setEmail (email);
  };

  const onLogin = () => {
    console.log (email);
    console.log ('Login !');
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Modal title="LOGIN">
          <Input
            label="Email"
            width="32vw"
            type="email"
            handleChange={email => changeEmail (email)}
          />
          <div style={{paddingTop: '25px'}}>
            <Button title="GET CODE" onClick={onLogin} />
          </div>
          <SubMessage
            text="Do not have an account?"
            link="/signup"
            textLink="Sign up"
          />
        </Modal>
      </div>
    </div>
  );
};

export default Login;
