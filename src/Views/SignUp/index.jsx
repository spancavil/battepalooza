import React from 'react';
import Button from '../../Global-Components/Button';
import Checkbox from '../../Global-Components/Checkbox';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import styles from './style.module.scss';
import { useState } from 'react';
import SubMessage from '../../Global-Components/SubMessage';
import authService from '../../Services/auth.service';
import { useHistory } from 'react-router';

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    checked: false,
    checkedEmail: false
  });

  const [errorEmail, setErrorEmail] = useState('');
  const [errorFirstname, setErrorFirstname] = useState('');
  const [errorLastname, setErrorLastname] = useState('');
  const [errorChecked, setErrorChecked] = useState('');

  const history = useHistory();

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
      
    if (!error){
      const response = await authService.register (
        form.firstName,
        form.lastName,
        form.email
      );
      if (response.data.message.includes("undefined")){
        alert("Email already registered!");
      } else {
        alert("User registered succesfully!");
        history.push ('/login');
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
        <Checkbox
          label="I want to receive emails from nWay including information about our upcoming drops as well as news, offers and survey"
          width="90%"
          onChecked={checked => changeCheckedEmails(checked)}
        />
        {errorChecked && <span className={styles.errorMessage}>{errorChecked}</span>}
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
