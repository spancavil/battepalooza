import React from 'react';
import Button from '../../Global-Components/Button';
import Checkbox from '../../Global-Components/Checkbox';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import styles from './style.module.scss';
import {useState} from 'react';
import SubMessage from '../../Global-Components/SubMessage';

const SignUp = () => {
  const [form, setForm] = useState ({
    firstName: '',
    lastName: '',
    email: '',
    checked: false,
  });

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

  const onSingUp = () => {
    alert(`User: ${form.firstName} ${form.firstName}, email: ${form.email} registered!`)
  };

  return (
    <div className={styles.container}>
      <Modal title="SIGN UP">
        <Input
          label="Email"
          width="32vw"
          type="email"
          handleChange={email => changeEmail (email)}
        />
        <div className={styles.divRow2}>
          <Input
            label="First Name"
            width="15vw"
            type="name"
            handleChange={firstName => changeName (firstName)}
          />
          <Input
            label="Last Name"
            width="15vw"
            type="name"
            handleChange={lastName => changeLastName (lastName)}
          />
        </div>
        <Checkbox
          label="I agree to the Terms of Service and Private Policy"
          width="32vw"
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
