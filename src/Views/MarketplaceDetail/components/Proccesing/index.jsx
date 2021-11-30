import React from 'react';
import Modal from '../../../../Global-Components/Modal';
import './styles.module.scss';

const Proccesing = () => {
    return (
        <div className={styles.parentContainerModal}>
          <Modal title="Checkout" handleClose={handleClose}>
            <h3 className={styles.textDrop}>
              Will you use
              {pack.price}
              nCoin to buy
              {pack.description.text1}
              {}?
            </h3>
            <Button title="BUY" width="176px" onClick={handleBuy} />
            <SubMessage
              text="Not enough nCoin?"
              link="/account"
              textLink="Charge now"
            />
          </Modal>
        </div>
    )
}

export default Proccesing
