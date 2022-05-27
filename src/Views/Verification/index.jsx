import React, { useContext } from 'react';
import Button from '../../Global-Components/Button';
import Input from './Components/Input';
import Modal from '../../Global-Components/Modal';
import Modal2 from './Components/Modal';
import styles from './styles.module.scss';
import { useState, useRef } from 'react';
import { UserData } from '../../Context/UserProvider';
import authService from '../../Services/auth.service';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { sendAmplitudeData, setAmplitudeUserId } from '../../Utils/amplitude';
import { fireAlert, fireAlertAsync } from '../../Utils/sweetAlert2';
import AppNway from '../../Assets/img/App nWayPlay 1.png';
import passCode from '../../Assets/img/PassCode 1.png';
import { useMediaQuery } from '../../Hooks/useMediaQuery';

const Verification = () => {
  const [code, setCode] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [modalNotRegistered, setModalNotRegistered] = useState(false);
  const [modalUserNotFound, setModalUserNotFound] = useState(false);
  const [linkingMessage, setLinkingMessage] = useState("Link")
  const [linked, setLinked] = useState(false)
  const loading = useRef(false);

  const mobile = useMediaQuery('(max-width: 766px)');

  const {
    setCodeVerification,
    setDataUser,
    userSignup,
    navigation,
    firstLogin,
  } = useContext(UserData);
  const history = useHistory();

  const handleChange = codigo => {
    if (codigo.length === 7) {
      const codigoAux = codigo.replace(/\s+/g, '');
      setCode(codigoAux);
    } else {
      setCode(codigo);
    }
  };

  const handleClose = () => {
    history.push('/');
  };

  /*  const handleSignOut = () => {
     setTimeout (() => {
       localStorage.removeItem ('userBP');
       history.push ('/');
       alert ('Session expired. Please login again.');
       window.location.reload ();
     }, 15 * 60 * 1000);
   }; */

  const submitCode = async e => {
    e.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setErrorCode('Input a valid code');
    } else {
      setErrorCode('');
      setCodeVerification(code);
      const response = firstLogin
        ? await authService.login(
          userSignup.email,
          code,
          '/first-login',
          userSignup
        )
        : await authService.login(userSignup.email, code, '');
      //Envío de datos de tracking a Amplitude

      const respuesta = response.data.response

      if (respuesta && respuesta.error?.num !== 0) {
        console.log(respuesta);
        await fireAlertAsync(`Error ${respuesta.error.num}`, respuesta.error.text);
        if (respuesta.error.num === 3003) setModalNotRegistered(true);
        else if (respuesta.error.num === 401) setModalUserNotFound(true);
        else fireAlert (`Error ${respuesta.error.num}`, respuesta.error.text)
      } else {
        //Send tracking data to amplitude
        if (firstLogin) {
          setAmplitudeUserId(response.data.pid);
          sendAmplitudeData('Registration/Sign Up');
        } else {
          setAmplitudeUserId(response.data.pid);
          sendAmplitudeData('Registration/Log in');
        }

        setDataUser(response);
        //handleSignOut ();
        history.push(navigation);
      }
    }
  };

  //Handle link debería registrar al usuario por primera vez.
  const handleLink = async () => {
    console.log("Loading:" + loading.current);
    setLinkingMessage("Linking...");
    if (!loading.current){

      loading.current = true
      const response = await authService.login(
        userSignup.email,
        code,
        '/first-login',
        userSignup
      )
      console.log(response);

      if (response.data.message) {
        await fireAlertAsync("Error at linking", response.data.message)
      } else {
        setDataUser(response)
        setLinked(true)
      }

      loading.current = false
    }
  }

  console.log(loading.current);

  return (
    <>
      {!modalNotRegistered && !modalUserNotFound && (
        <div className={styles.container}>
          <Modal title="VERIFICATION" handleClose={handleClose}>
            <form style={{ width: '100%' }} onSubmit={submitCode}>
              <div className={styles.inputContainer}>
                <Input
                  label="Code"
                  width="100%"
                  subtitle="Input the 6 digit code that has been sent to your email"
                  handleChange={code => handleChange(code)}
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
      )}
      {modalNotRegistered && (
        <div className={styles.container}>
          <Modal title="NOT REGISTERED" handleClose={handleClose}>
            <span className={styles.contentTextCenter}>The email you entered is not registered to any nWayPlay service. Will you register?</span>
            <div style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', padding: '3%', gap: '4%',
            }}>
              <Button title="YES" modal={true} onClick={() => history.push('/signup')} />
              <Button title="NO" modal={true} onClick={() => history.push('/')} />
            </div>
          </Modal>
        </div>
      )}
      {modalUserNotFound && !linked && (
        <div className={styles.container}>
          <Modal2 title="nWay Play Link" handleClose={handleClose} additionalStyles={{width: mobile ? '100vw' : '70vw'}}>
            <span className={styles.contentText}>You are registered to one of nWayPlay's services. Press proceed to link your nWayPlay account.</span>
            <span className={styles.contentText}>If you already have played Battlepalooza without linking a nWayPlay account, proceed as follows</span>
            <p
            className={styles.textResponsive}
            style={{
              textAlign: 'left',
              fontSize: '14px',
              fontWeight: '500',
              padding: '15px 20px',
            }}
          >
            Please link your account with nWayPlay using the mobile app in order to bring your saved data or game progress. If you do not link your Battlepalooza account using the mobile app, you might lose your game progress. We will not be responsible for lost data, or merge accounts for users who have more than one account. Please follow the following steps using the mobile app in order to link your account:
            <br />
            <br />
            1) From the Lobby go to Settings<br />
            2) Press nWayPlay <br />
            3) Input your email and press Send Passcode<br />
            4) Input the Passcode sent to your email and press Verify.<br />
          </p>
          <div className={styles.imgContainer}>
            <img className={styles.imgModal} src={AppNway} alt="App Nway" />
            <img className={styles.imgModal} src={passCode} alt="Passcode" />
          </div>
            <div style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', gap: '4%', overflow: 'visible',
            }}>
              <Button title= {linkingMessage} modal={true} onClick={handleLink} />
              <Button title="NO" modal={true} onClick={() => history.push('/')} />
            </div>
          </Modal2>
        </div>
      )}
      {linked && (
        <div className={styles.container}>
        <Modal title="Success" handleClose={handleClose}>
          <span className={styles.contentTextCenter}>The email you entered linked successfully!</span>
          <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', padding: '3%', gap: '4%',
          }}>
            <Button title="OK" modal={true} onClick={() => history.push('/')} />
          </div>
        </Modal>
      </div>
      )}
    </>
  );
};

export default Verification;
