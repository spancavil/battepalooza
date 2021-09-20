import React from 'react';
import Button from '../../Global-Components/Button';
import Input from '../../Global-Components/Input';
import Modal from '../../Global-Components/Modal';
import SubMessage from '../../Global-Components/SubMessage';
import styles from './styles.module.scss';

const Verification = () => {
  return (
    <div>
      <div className={styles.container}>
        <Modal title="VERIFICATION">
          <Input
            label="Code"
            width="32vw"
            subtitle="Input the 6 digit code that has been sent to your email"
          />
          <div style={{paddingTop: '40px'}}>
            <Button title="GET CODE" />
          </div>
          <SubMessage text="Did not recieve email? Check your spam folder.
        If you have not received your email contact support" />
        </Modal>
      </div>
    </div>
  );
};

export default Verification;
