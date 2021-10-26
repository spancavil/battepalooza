import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router';
import {UserData} from '../../Context/UserProvider';
import Button from '../../Global-Components/Button';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import SubMessage from '../../Global-Components/SubMessage';
import authService from '../../Services/auth.service';
import styles from './styles.module.scss';

const Login = () => {
  const [email, setEMail] = useState ('Debe ser un email válidoc');
  const [errorEmail, setErrorEmail] = useState ('');

  const {setMail} = useContext (UserData);

  const history = useHistory ();

  const changeEmail = email => {
    setEMail (email);
  };

  const handleClose = () => {
    history.push ('/');
  };

  const onLogin = async e => {
    e.preventDefault ();

    if (!/\S+@\S+\.\S+/.test (email)) {
      setErrorEmail ('Input a valid email');
    } else {
      setErrorEmail ('');
      setMail (email);
      const response = await authService.getVerificationCode (email);

      console.log (response);
      console.log ('Me active');

      if (response.success === false) {
        alert (response.message);
      } else {
        alert (response.message);
        history.push ('/verification');
      }
    }
  };

  return (
    <div className={styles.container}>
      <Modal title="LOGIN" handleClose={handleClose}>
        <form style={{width: '100%'}} onSubmit={onLogin}>
          <div className={styles.inputContainer}>
            <Input
              label="Email"
              width="100%"
              type="email"
              handleChange={email => changeEmail (email)}
              autofocus
            />
            {errorEmail &&
              <span className={styles.errorMessage}>{errorEmail}</span>}
          </div>
          <div
            style={{
              paddingTop: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button  title="GET CODE" />
          </div>
        </form>
        <SubMessage
          text="Do not have an account?"
          link="/signup"
          textLink="Sign up"
        />
      </Modal>
    </div>
  );
};

export default Login;
