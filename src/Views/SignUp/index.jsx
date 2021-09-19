import React from 'react';
import Button from '../../Global-Components/Button';
import Checkbox from '../../Global-Components/Checkbox';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SignUp = () => {

  const [form, setForm] = useState(
    { firstName: "", lastName: "", email: "", checked: false })

  const changeEmail = (email) => {
    setForm({ ...form, email })
  }

  const changeName = (firstName) => {
    setForm({ ...form, firstName })
  }

  const changeLastName = (lastName) => {
    setForm({ ...form, lastName })
  }

  const changeChecked = (checked) => {
    setForm({ ...form, checked })
  }

  const onSingUp = () => {
    console.log(form);
    console.log("SignUp !")
  }

  return (
    <div>
      <Modal title="SIGN UP">
        <Input label="Email" width="32vw" type="email" handleChange={(email) => changeEmail(email)}></Input>
        <div className={styles.divRow2}>
          <Input label="First Name" width="15vw" type="name" handleChange={(firstName) => changeName(firstName)} />
          <Input label="Last Name" width="15vw" type="name" handleChange={(lastName) => changeLastName(lastName)} />
        </div>
        <Checkbox label="I agree to the Terms of Service and Private Policy" width="32vw" onChecked={(checked) => changeChecked(checked)} />
        <div style={{ paddingTop: "40px" }}>
          <Button title="SIGN UP" onClick={onSingUp} />
        </div>
        <span className={styles.message} >Already have an account? <Link to=" /signin ">Login</Link></span>
      </Modal>
    </div>
  );
};

export default SignUp;
