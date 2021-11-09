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
import { sendAmplitudeData } from '../../Utils/amplitude';
import CheckboxInLine from './CheckboxInLine';

const SignUp = () => {
  const {setUserSignUp, setLoginFirst} = useContext (UserData);

  const [check1, setCheck1] = useState("");
  const [check2, setCheck2] = useState("")
  const [showOptions, setShowOptions] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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
  const [statusVerify, setSatatusVerify] = useState ('');

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

      console.log (token);
      const response = await authService.verifyCaptcha (token);
      console.log (response);

      if (response.success === true) {
        setForm ({...form, checkedReCaptcha: true, reCaptchaToken: token});
        setSatatusVerify ('.. ✓');
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

    console.log("Sign up!")
    let error = false;

    if (!/\S+@\S+\.\S+/.test (form.email)) {
      setErrorEmail ('Invalid email');
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
      const response = await authService.getVerificationCode(
        form.email,
      );
      if (response.message.includes("later")){
        alert ('Please try again later!'); 
      }else {
        setUserSignUp({
          email: form.email,
          checkedEmail: form.checkedEmail})
        setLoginFirst ();
        alert ('Verification code sent!');
        //In case the newsletter checked, send tracking
        if (form.checkedEmail) sendAmplitudeData("Newsletter Suscribe");
        history.push ('/verification');
      }
    }
  };

  const handleClose = () => {
    history.push ('/');
  };
  console.log(check1, check2);

  const check1Fn = (option) => {
    setCheck1(option);
    if (option === "no"){
      setShowOptions(false);
      setShowSignUp(true);
    }
  }

  const check2Fn = (option) => {
    setCheck2(option);
    if (option === "no"){
      setShowInfo(true);
      setShowOptions(false)
    }
    else {
      history.push('/login');
    }
  }

  return (
    <div className={styles.container}>
      {showOptions &&
        <Modal title="User Information Request" handleClose={handleClose}>
          <div className={styles.divRow3}>
            <h1 className={styles.text}>Please answer the following questions accurately in order to get the best experience.</h1>
            <CheckboxInLine
              title="Do you have Battlepalooza account from the mobile app?"
              check = {(option)=> check1Fn(option)}
              checked = {check1 !== "" ? true : false}
            />
            <CheckboxInLine
              title="Did you link your account to nWayPlay?"
              check = {(option)=> check2Fn(option)}
              checked = {(check2 === "" && (check1 !== "")) ? false : true}
            />
          </div>
        </Modal>

      }
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
        <div style={{paddingTop: '40px'}}>
          <Button title="SIGN UP" onClick={onSingUp} />
        </div>
        <SubMessage
          text="Already have an account?"
          link="/login"
          textLink="Login"
        />
      </Modal>
      }
      {
        showInfo && 
        <Modal
          title="Link Account Using Mobile App"
          handleClose = {handleClose}
        >

        </Modal>
      }
    </div>
  );
};

export default SignUp;
