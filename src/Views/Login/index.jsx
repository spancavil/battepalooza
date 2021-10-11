import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router';
import { UserData } from '../../Context/UserProvider';
import Button from '../../Global-Components/Button';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import SubMessage from '../../Global-Components/SubMessage';
import authService from '../../Services/auth.service';
import styles from './styles.module.scss';


const Login = () => {
  const [email, setEMail] = useState ('Debe ser un email válidoc');
  const [errorEmail, setErrorEmail] = useState ('');

  const {setMail} = useContext(UserData);

  const history = useHistory ();

  const changeEmail = email => {
    setEMail (email);
  };

  const handleClose = () => {
    history.push('/')
  }

  const onLogin = async () => {
    if(!(/\S+@\S+\.\S+/.test(email))){
      setErrorEmail ('Input a valid email')
    } else {
      setErrorEmail ('');
      setMail(email);
      const response = await authService.getVerificationCode(email);
      if (response.data.error){
        alert("Email doesnt exist!")
      } else {
        alert(response.data.message)
        history.push('/verification')
      }
    }
  };

  return (
    <div className={styles.container}>
      <Modal title="LOGIN" handleClose={handleClose}>
        <div className={styles.inputContainer}>
          <Input
            label="Email"
            width="100%"
            type="email"
            handleChange={email => changeEmail (email)}
          />
          {errorEmail && <span className={styles.errorMessage}>{errorEmail}</span>}
        </div>
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
  );
};

export default Login;
