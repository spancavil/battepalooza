import React, { useContext } from 'react';
import Button from '../../Global-Components/Button';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import styles from './styles.module.scss';
import { useState } from 'react';
import { UserData } from '../../Context/UserProvider';
import authService from '../../Services/auth.service';
import { useHistory } from 'react-router';

const Verification = () => {
  const [code, setCode] = useState("");
  const [errorCode, setErrorCode] = useState("")
  const {setCodeVerification, setTheToken, email} = useContext(UserData);
  const history = useHistory();

  const handleChange = (codigo) => {
    setCode(codigo);
  }

  const submitCode = async () => {
    if ( !(/^\d{6}$/.test(code))){
      setErrorCode("Input a valid code")
    } else {
      setErrorCode('');
      setCodeVerification (code)
      const response = await authService.login(email, code);
      
      if (response.data.message){
        alert(response.data.message)
      } else {
        setTheToken(response);
        history.push('/account') 
      }

    }
    
  }

  return (
    <div className={styles.container}>
      <Modal title="VERIFICATION">
        <div className={styles.inputContainer}>
          <Input
            label="Code"
            width="100%"
            subtitle="Input the 6 digit code that has been sent to your email"
            handleChange={(code)=> handleChange(code)}
          />
          {errorCode && <span className={styles.errorMessage}>{errorCode}</span>}
        </div>
        <div style={{ paddingTop: '40px' }}>
          <Button title="VERIFY"
          onClick = {submitCode}
          />
        </div>
        <span className={styles.message}>
          Did not recieve email? Check your spam folder. <br />
          If you have not received your email contact support
        </span>
      </Modal>
    </div>
  );
};

export default Verification;
