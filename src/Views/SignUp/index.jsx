import React, {useContext} from 'react';
import Button from '../../Global-Components/Button';
import Checkbox from '../../Global-Components/Checkbox';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import styles from './style.module.scss';
import {useState} from 'react';
import SubMessage from '../../Global-Components/SubMessage';
import authService from '../../Services/auth.service';
import {useHistory} from 'react-router';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import CheckboxDisabled from './CheckboxDisabled';
import {UserData} from '../../Context/UserProvider';
import CheckboxLinks from './CheckboxWithLinks';
import {sendAmplitudeData} from '../../Utils/amplitude';
import CheckboxInLine from './CheckboxInLine';
import AppNway from '../../Assets/img/App nWayPlay 1.png';
import passCode from '../../Assets/img/PassCode 1.png';
import ModalUnderstood from './ModalUnderstood';

const SignUp = () => {
  const {setUserSignUp, setLoginFirst} = useContext (UserData);

  const [check1, setCheck1] = useState ('');
  const [check2, setCheck2] = useState ('');
  const [showOptions, setShowOptions] = useState (true);
  const [showSignUp, setShowSignUp] = useState (false);
  const [showInfo, setShowInfo] = useState (false);

  const [form, setForm] = useState ({
    email: '',
    checked: false,
    checkedEmail: false,
    checkedReCaptcha: false,
    reCaptchaToken: '',
  });

  const [errorEmail, setErrorEmail] = useState ('');
  // const [errorFirstname, setErrorFirstname] = useState ('');
  // const [errorLastname, setErrorLastname] = useState ('');
  const [errorChecked, setErrorChecked] = useState ('');
  const [errorCaptcha, setErrorReCaptcha] = useState ('');
  const [statusVerify, setStatusVerify] = useState ('');

  const history = useHistory ();
  const {executeRecaptcha} = useGoogleReCaptcha ();

  const changeEmail = email => {
    setForm ({...form, email});
    setErrorEmail ('');
  };

  /* const changeName = firstName => {
    setForm ({...form, firstName});
    setErrorFirstname ('');
  };

  const changeLastName = lastName => {
    setForm ({...form, lastName});
    setErrorLastname ('');
  }; */

  const changeChecked = checked => {
    setForm ({...form, checked});
    setErrorChecked ('');
  };

  const changeCheckedEmails = checked => {
    setForm ({...form, checkedEmail: checked});
  };

  const reCAPTCHA = async () => {
    if (!executeRecaptcha) {
      alert ('Execute reCAPTCHA not yet available');
      return;
    }

    try {
      const token = await executeRecaptcha ('');
      const response = await authService.verifyCaptcha (token);
      if (response.success === true) {
        setForm ({...form, checkedReCaptcha: true, reCaptchaToken: token});
        setStatusVerify ('.. ✓');
        setErrorReCaptcha ('');
      } else {
        alert ('Cannot verify reCAPTCHA, please reload page');
      }
    } catch (error) {
      alert (error + ' please reload!');
    }
  };

  const handleReCAPTCHA = async checked => {
    setForm ({...form, checkedReCaptcha: true});
    await reCAPTCHA ();
  };

  const onSingUp = async () => {
    let error = false;

    if (!/\S+@\S+\.\S+/.test (form.email)) {
      setErrorEmail ('Input a valid email');
      error = true;
    } else {
      setErrorEmail ('');
    }
    /* 
    if (
      /\d/.test (form.firstName) ||
      form.firstName.length < 2 ||
      form.firstName === ''
    ) {
      setErrorFirstname ('Invalid first name');
      error = true;
    } else {
      setErrorFirstname ('');
    }

    if (
      /\d/.test (form.lastName) ||
      form.lastName.length < 2 ||
      form.lastName === ''
    ) {
      setErrorLastname ('Invalid last name');
      error = true;
    } else {
      setErrorLastname ('');
    } */

    if (!form.checked) {
      setErrorChecked ('You must accept terms and privacy');
      error = true;
    } else {
      setErrorChecked ('');
    }

    if (!form.reCaptchaToken) {
      setErrorReCaptcha ('Click for check you are not a robot');
      error = true;
    }

    if (!error) {
      const response = await authService.getVerificationCode (form.email);
      if (response.message.includes ('later')) {
        alert ('Please try again later!');
      } else {
        setUserSignUp ({
          email: form.email.toLowerCase(),
          getMails: form.checkedEmail,
        });
        setLoginFirst ();
        alert ('Verification code sent!');
        //In case the newsletter checked, send tracking
        if (form.checkedEmail) sendAmplitudeData ('Newsletter Suscribe');
        history.push ('/verification');
      }
    }
  };

  const handleClose = () => {
    history.push ('/');
  };

  const check1Fn = option => {
    setCheck1 (option);
    if (option === 'No') {
      setShowOptions (false);
      setShowSignUp (true);
    }
  };

  const check2Fn = option => {
    setCheck2 (option);
    if (option === 'No') {
      setShowInfo (true);
      setShowOptions (false);
    } else {
      history.push ('/login');
    }
  };

  return (
    <div className={styles.container}>
      {showOptions &&
        <Modal title="User Information Request" handleClose={handleClose}>
          <div className={styles.divRow3}>
            <h1 className={styles.text}>
              Please answer the following questions accurately in order to get the best experience.
            </h1>
            <CheckboxInLine
              title="Do you have Battlepalooza account from the mobile app?"
              check={option => check1Fn (option)}
              deshabilitado ={false}
            />
            <CheckboxInLine
              title="Did you link your account to nWayPlay?"
              check={option => check2Fn (option)}
              deshabilitado = {check2 === '' && check1 !== '' ? false : true}
            />
          </div>
        </Modal>}
      {showSignUp &&
        <Modal title="SIGN UP" handleClose={handleClose}>
          <div className={styles.divRow1}>
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

          <CheckboxLinks
            width="90%"
            onChecked={checked => changeChecked (checked)}
          />
          {errorChecked &&
            <span className={styles.errorMessage}>{errorChecked}</span>}
          <Checkbox
            label="I want to receive emails from nWay including information about our upcoming drops as well as news, offers and surveys"
            width="90%"
            onChecked={checked => changeCheckedEmails (checked)}
          />

          <CheckboxDisabled
            className={form.reCaptchaToken ? null : styles.disabled}
            label={`I AM NOT A ROBOT - reCAPTCHA ${statusVerify}`}
            width="90%"
            onChecked={checked => handleReCAPTCHA (checked)}
            checked={form.checkedReCaptcha}
          />

          {errorCaptcha &&
            <span className={styles.errorMessage}>{errorCaptcha}</span>}
          <div style={{paddingTop: '40px', overflow: 'visible'}}>
            <Button title="SIGN UP" onClick={onSingUp} modal = {true} />
          </div>
          <SubMessage
            text="Already have an account?"
            link="/login"
            textLink="Login"
          />
        </Modal>}
      {showInfo &&
        <ModalUnderstood title="Link Account Using Mobile App" handleClose={handleClose}>
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
          <div style={{overflow: "visible"}}>
            <Button title="UNDERSTOOD" onClick={handleClose} />
          </div>
        </ModalUnderstood>}
    </div>
  );
};

export default SignUp;
