import React, {useContext, useState} from 'react';
import {Fragment} from 'react';
import {useHistory} from 'react-router';
import {UserData} from '../../Context/UserProvider';
import Button from '../../Global-Components/Button';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import PopUp from '../../Global-Components/PopUp';
import SubMessage from '../../Global-Components/SubMessage';
import authService from '../../Services/auth.service';
import Background from './components/Background';
import Dialog from './components/Dialog';
import LeftBanner from './components/LeftBanner';
import styles from './styles.module.scss';

const Login = () => {

  let menu2 = true;

  const [email, setEMail] = useState ('Debe ser un email válidoc');
  const [errorEmail, setErrorEmail] = useState ('');
  const [popUp, setPopUp] = useState (false);
  const [message, setMessage] = useState ('');
  const [loading, setLoading] = useState (false);
  const [formSend, setFormSend] = useState (false);

  const {setUserSignUp} = useContext (UserData);

  const history = useHistory ();

  const changeEmail = email => {
    setEMail (email);
  };

  const handleClose = () => {
    history.push ('/');
  };

  const onLogin = async e => {
    e.preventDefault ();

    if (formSend !== true) {
      if (!/\S+@\S+\.\S+/.test (email)) {
        setErrorEmail ('Input a valid email');
      } else {
        setErrorEmail ('');
        setUserSignUp ({
          email: email.toLowerCase(),
        });
        setLoading (true);
        setFormSend (true);

        const response = await authService.getVerificationCode (email);

        if (response.success === false) {
          setMessage (response.message);
          // setPopUp (true);
          setTimeout (() => setPopUp (false) && setLoading (false), 3000);
        } else {
          setMessage (response.message);
          setPopUp (true);
          setTimeout (
            () => history.push ('/verification'),
            2000
          );
        }
      }
    }
  };

  if (menu2) {
    return (
      <Background>
        <LeftBanner/>
        <Dialog setEmail={changeEmail} sendCode={onLogin} loading={loading}/>
      </Background>
    )
  }

  return (
    <Fragment>
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
                autoComplete='on'
              />
              {errorEmail &&
                <span className={styles.errorMessage}>{errorEmail}</span>}
            </div>
            <div
              style={{
                padding: '25px 0px 12px 0px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {loading
                ? <Button style={{cursor: 'no-drop'}} title="LOADING..." modal = {true}/>
                : <Button title="GET CODE" modal ={true} />}
            </div>
          </form>
          <SubMessage
            text="Do not have an account?"
            link="/signup"
            textLink="Sign up"
          />
        </Modal>
      </div>
      {popUp &&
        <div className={styles.popUpContainer}>
          <PopUp text={message || 'Something bad happened...'} />
        </div>}
    </Fragment>
  );
};

export default Login;
