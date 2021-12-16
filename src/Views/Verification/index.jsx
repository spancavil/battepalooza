import React, {useContext} from 'react';
import Button from '../../Global-Components/Button';
import Input from './Components/Input';
import Modal from '../../Global-Components/Modal';
import styles from './styles.module.scss';
import {useState} from 'react';
import {UserData} from '../../Context/UserProvider';
import authService from '../../Services/auth.service';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {sendAmplitudeData, setAmplitudeUserId} from '../../Utils/amplitude';

const Verification = () => {
  const [code, setCode] = useState ('');
  const [errorCode, setErrorCode] = useState ('');
  const {
    setCodeVerification,
    setDataUser,
    userSignup,
    navigation,
    firstLogin,
  } = useContext (UserData);
  const history = useHistory ();

  const handleChange = codigo => {
    if (codigo.length === 7) {
      const codigoAux = codigo.replace (/\s+/g, '');
      setCode (codigoAux);
    } else {
      setCode (codigo);
    }
  };

  const handleClose = () => {
    history.push ('/');
  };

  const handleSignOut = () => {
    setTimeout (() => {
      localStorage.removeItem ('user');
      history.push ('/');
      alert ('Session expired. Please login again.');
      window.location.reload ();
    }, 15 * 60 * 1000);
  };

  const submitCode = async e => {
    e.preventDefault ();
    if (!/^\d{6}$/.test (code)) {
      setErrorCode ('Input a valid code');
    } else {
      setErrorCode ('');
      setCodeVerification (code);
      const response = firstLogin
        ? await authService.login (
            userSignup.email,
            code,
            '/first-login',
            userSignup
          )
        : await authService.login (userSignup.email, code, '');
      //Envío de datos de tracking a Amplitude

      if (response.data.message) {
        alert (response.data.message);
      } else {
        //Send tracking data to amplitude
        if (firstLogin) {
          setAmplitudeUserId (response.data.pid);
          sendAmplitudeData ('Registration/Sign Up');
        } else {
          setAmplitudeUserId (response.data.pid);
          sendAmplitudeData ('Registration/Log in');
        }

        setDataUser (response);
        handleSignOut ();
        history.push (navigation);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Modal title="VERIFICATION" handleClose={handleClose}>
        <form style={{width: '100%'}} onSubmit={submitCode}>
          <div className={styles.inputContainer}>
            <Input
              label="Code"
              width="100%"
              subtitle="Input the 6 digit code that has been sent to your email"
              handleChange={code => handleChange (code)}
              value={code}
              autofocus
            />
            {errorCode &&
              <span className={styles.errorMessage}>{errorCode}</span>}
          </div>
          <div
            style={{
              padding: '20px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button title="VERIFY" modal={true} />
          </div>
        </form>
        <span className={styles.message}>
          Did not receive email? Check your spam folder. <br />
          If you have not received you email,
          <Link to="/help">contact support</Link>
          .
        </span>
      </Modal>
    </div>
  );
};

export default Verification;
