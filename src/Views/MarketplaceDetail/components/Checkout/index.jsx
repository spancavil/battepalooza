import React from 'react'
import Modal from '../../../../Global-Components/Modal';
import styles from './styles.module.scss';
import Button from '../../../../Global-Components/Button';
import SubMessage from '../../../../Global-Components/SubMessage';

const Checkout = ({nftBuy, nftProccesing, handleClose}) => {
    return (
        <div className={styles.parentContainerModal}>
          <Modal title="Checkout" handleClose={()=> handleClose(false)}>
            <h3 className={styles.textDrop}> Will you use {nftBuy.price} nCoin to buy {nftBuy.title1}?</h3>
            <Button title="BUY" width="176px" onClick={()=> nftProccesing(true)} />
            <SubMessage
              text="Not enough nCoin?"
              link="/account"
              textLink="Charge now"
            />
          </Modal>
        </div>
    )
}

export default Checkout
