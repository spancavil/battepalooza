import React from 'react';
import Button from '../../Global-Components/Button';
import Checkbox from '../../Global-Components/Checkbox';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import styles from './style.module.scss';
import {useState} from 'react';
import SubMessage from '../../Global-Components/SubMessage';
import authService from '../../Services/auth.service';
import {useHistory} from 'react-router';

const SignUp = () => {
  const [form, setForm] = useState ({
    firstName: '',
    lastName: '',
    email: '',
    checked: false,
  });

  const [errorEmail, setErrorEmail] = useState ('');
  const [errorFirstname, setErrorFirstname] = useState ('');
  const [errorLastname, setErrorLastname] = useState ('');
  const [errorChecked, setErrorChecked] = useState ('');

  const history = useHistory ();

  const changeEmail = email => {
    setForm ({...form, email});
    setErrorEmail ('');
  };

  const changeName = firstName => {
    setForm ({...form, firstName});
    setErrorFirstname ('');
  };

  const changeLastName = lastName => {
    setForm ({...form, lastName});
    setErrorLastname ('');
  };

  const changeChecked = checked => {
    setForm ({...form, checked});
    setErrorChecked ('');
  };

  console.log(errorFirstname)

  const onSingUp = async () => {
    !form.email.includes ('@')
      ? setErrorEmail ('Debe ser un email válido')
      : setErrorEmail ('');

    console.log(form.firstName.match (/^[0-9]+$/))
      ? setErrorFirstname ('No puede contener numero')
      : setErrorFirstname ('');

    // form.lastName.test (/^[0-9]+$/)
    //   ? setErrorLastname ('No puede contener numero')
    //   : setErrorLastname ('');

    // const response = await authService.register (
    //   form.firstName,
    //   form.lastName,
    //   form.email
    // );
    // history.push ('/');
  };

  return (
    <div className={styles.container}>
      <Modal title="SIGN UP">
        <div className={styles.divRow1}>
          <Input
            label="Email"
            width="100%"
            type="email"
            handleChange={email => changeEmail (email)}
          />
          {errorEmail && <p>{errorEmail}</p>}
        </div>
        <div className={styles.divRow2}>
          <Input
            label="First Name"
            width="100%"
            type="name"
            handleChange={firstName => changeName (firstName)}
          />

          <Input
            label="Last Name"
            width="100%"
            type="name"
            handleChange={lastName => changeLastName (lastName)}
          />
        </div>
        <div className={styles.divRow2}>
          {errorFirstname
            ? <p>{errorFirstname}</p>
            : <p style={{display: 'hidden', width: '100%'}}>
                {errorFirstname}
              </p>}
          {errorLastname && <p>{errorLastname}</p>}
        </div>
        <Checkbox
          label="I agree to the Terms of Service and Private Policy"
          width="90%"
          onChecked={checked => changeChecked (checked)}
        />
        <div style={{paddingTop: '40px'}}>
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
