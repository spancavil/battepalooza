import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../Global-Components/Button';
import Modal from '../../Global-Components/Modal';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { UserData } from '../../Context/UserProvider';

const NeedLogin = () => {

  const {userData} = useContext(UserData);
  const history = useHistory()

  const handleClose = () => {
    history.push('/')
  }

  const closeWithEsc = (event) => {
    console.log(event)
  }

  if (Object.keys(userData).length !== 0) history.goBack();

  return (
    <div className={styles.container} onKeyDown={closeWithEsc}>
      <Modal title="NEED LOGIN" handleClose = {handleClose}>
        <span className={styles.text}>You need to login in order to proceed.</span>
        <div className={styles.btns}>
            <Button title="LOGIN" modal = {true} onClick ={()=> history.push('/login')}/>
            <Button title="SIGN UP" modal = {true} onClick ={()=> history.push('/signup')}/>
        </div>
      </Modal>
    </div>
  );
};

export default NeedLogin;
