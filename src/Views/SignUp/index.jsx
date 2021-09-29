import React from 'react';
import Button from '../../Global-Components/Button';
import Checkbox from '../../Global-Components/Checkbox';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import styles from './style.module.scss';
import {useState} from 'react';
import SubMessage from '../../Global-Components/SubMessage';
import authService from '../../Services/auth.service';
import { useHistory } from 'react-router';

const SignUp = () => {
  const [form, setForm] = useState ({
    firstName: '',
    lastName: '',
    email: '',
    checked: false,
  });
  const history = useHistory();

  const changeEmail = email => {
    setForm ({...form, email});
  };

  const changeName = firstName => {
    setForm ({...form, firstName});
  };

  const changeLastName = lastName => {
    setForm ({...form, lastName});
  };

  const changeChecked = checked => {
    setForm ({...form, checked});
  };

  const onSingUp = async () => {
    const response = await authService.register(form.firstName, form.lastName, form.email);
    console.log(response);
    alert(response.data.message);
    history.push('/');
  };

  return (
    <div className={styles.container}>
      <Modal title="SIGN UP">
      <div className = {styles.divRow1}>
        <Input
          label="Email"
          width="100%"
          type="email"
          handleChange={email => changeEmail (email)}
        />
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
