import React, { useContext } from 'react';
import Button from '../../Global-Components/Button';
import Checkbox from '../../Global-Components/Checkbox';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import styles from './style.module.scss';
import { useState } from 'react';
import SubMessage from '../../Global-Components/SubMessage';
import authService from '../../Services/auth.service';
import { useHistory } from 'react-router';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import CheckboxDisabled from './CheckboxDisabled';
import { UserData } from '../../Context/UserProvider';

const SignUp = () => {

  const {setMail, setLoginFirst} = useContext(UserData);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    checked: false,
    checkedEmail: false,
    checkedReCaptcha: false,
    reCaptchaToken: '',
  });

  const [errorEmail, setErrorEmail] = useState('');
  const [errorFirstname, setErrorFirstname] = useState('');
  const [errorLastname, setErrorLastname] = useState('');
  const [errorChecked, setErrorChecked] = useState('');
  const [errorCaptcha, setErrorReCaptcha] = useState('');
  const [statusVerify, setSatatusVerify] = useState('');

  const history = useHistory();
  const {executeRecaptcha} = useGoogleReCaptcha()

  const changeEmail = email => {
    setForm({ ...form, email });
    setErrorEmail('');
  };

  const changeName = firstName => {
    setForm({ ...form, firstName });
    setErrorFirstname('');
  };

  const changeLastName = lastName => {
    setForm({ ...form, lastName });
    setErrorLastname('');
  };

  const changeChecked = checked => {
    setForm({ ...form, checked });
    setErrorChecked('');
  };

  const changeCheckedEmails = checked => {
    setForm({...form, checkedEmail: checked})
  }

  const reCAPTCHA = async () => {
    if (!executeRecaptcha){
      alert("Execute reCAPTCHA not yet available")
    }
    const token = await executeRecaptcha("");
    const response = await authService.verifyCaptcha(token);

    if (response.success === true){
      setForm({...form, checkedReCaptcha: true, reCaptchaToken: token})
      setSatatusVerify(".. ✓")
      setErrorReCaptcha('');
    }
    else {
      alert("Cannot verify reCAPTCHA, please reload page")
    }
  }

  const handleReCAPTCHA = async (checked) => {
    setForm({...form, checkedReCaptcha: true})
    await reCAPTCHA();
  }

  const onSingUp = async () => {
    let error = false;

    if (!(/\S+@\S+\.\S+/.test(form.email))){
      setErrorEmail('Invalid email')
      error = true;
    }else {
      setErrorEmail('');
    }

    if ((/\d/.test(form.firstName) || (form.firstName.length < 2) || (form.firstName === ""))) {
      setErrorFirstname('Invalid first name');
      error = true;
    } else {
      setErrorFirstname('');
    }
    
    if ((/\d/.test(form.lastName) || (form.lastName.length < 2) || (form.lastName === ""))) {
      setErrorLastname('Invalid last name')
      error = true;
    } else {
      setErrorLastname('');
    }
    
    if (!(form.checked)){
      setErrorChecked('You must accept terms and privacy')
      error = true
    } else {
      setErrorChecked('')
    }

    if (!(form.reCaptchaToken)){
      setErrorReCaptcha('Click for check you are not a robot')
      error = true
    }
      
    if (!error){
      const response = await authService.register (
        form.firstName,
        form.lastName,
        form.email,
        form.checkedEmail
      );
      if (response.data.message.includes("undefined")){
        alert("Email already registered!");
      }
      else if (response.data.error){
        alert ("Error! please try again later!")
      } else {
        setMail(form.email);
        setLoginFirst();
        alert("User registered succesfully! \nGo check your inbox!");
        history.push ('/verification');
      }
    }
  };

  const handleClose = () => {
    history.push('/')
  }

  return (
    <div className={styles.container}>
      <Modal title="SIGN UP" handleClose={handleClose}>
        <div className={styles.divRow1}>
          <Input
            label="Email"
            width="100%"
            type="email"
            handleChange={email => changeEmail(email)}
          />
          {errorEmail && <span className={styles.errorMessage}>{errorEmail}</span>}
        </div>
        <div className={styles.divRow2}>
          <Input
            label="First Name"
            width="100%"
            type="name"
            handleChange={firstName => changeName(firstName)}
          />

          <Input
            label="Last Name"
            width="100%"
            type="name"
            handleChange={lastName => changeLastName(lastName)}
          />
        </div>
        <div className={styles.divRow2}>
          {errorFirstname && <span className={styles.errorMessage}>{errorFirstname}</span>}
          {errorLastname && <span className={styles.errorMessage}>{errorLastname}</span>}
        </div>
        <Checkbox
          label="I agree to the Terms of Service and Private Policy" 
          width="90%"
          onChecked={checked => changeChecked(checked)}
        />
        {errorChecked && <span className={styles.errorMessage}>{errorChecked}</span>}
        <Checkbox
          label="I want to receive emails from nWay including information about our upcoming drops as well as news, offers and survey"
          width="90%"
          onChecked={checked => changeCheckedEmails(checked)}
        />
        
        <CheckboxDisabled
          className = {form.reCaptchaToken ? null: styles.disabled}
          label={`I AM NOT A ROBOT - reCAPTCHA ${statusVerify}`}
          width="90%"
          onChecked={checked => handleReCAPTCHA(checked)}
          checked = {form.checkedReCaptcha}
        />

        {errorCaptcha && <span className={styles.errorMessage}>{errorCaptcha}</span>}
        <div style={{ paddingTop: '40px' }}>
          <Button title="SIGN UP" onClick={onSingUp} />
        </div>
        <SubMessage
          text="Already have an account?"
          link="/login"
          textLink="Login"
        />
      </Modal>
    </div>
  );
};

export default SignUp;
