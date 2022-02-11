import React from 'react'
import Modal from '../../../../Global-Components/Modal';
import styles from './styles.module.scss';
import Button from '../../../../Global-Components/Button';
import SubMessage from '../../../../Global-Components/SubMessage';

const Checkout = ({nftBuy, nftProccesing, handleClose}) => {
    return (
        <div className={styles.parentContainerModal}>
          <Modal title="Checkout" handleClose={()=> handleClose(false)}>
            <div className={styles.totalContainer}>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <h3 className={styles.textDrop2}>Price</h3>
                <h3 className={styles.textDrop2}>{nftBuy.price} nCoin</h3>
              </div>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <h3 className={styles.textDrop2}>Fee (5%)</h3>
                <h3 className={styles.textDrop2}>{nftBuy.fee} nCoin</h3>
              </div>
              <hr style={{borderTop: '2px solid white', width: '95%', marginTop: "15px"}}/>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <h3 className={styles.textDrop2}>Total</h3>
                <h3 className={styles.textDrop2}>{nftBuy.price + nftBuy.fee} nCoin</h3>
              </div>
            </div>
            <h3 className={styles.textDrop}> Will you use {nftBuy.price + nftBuy.fee} nCoin to buy {nftBuy.itemName}?</h3>
            <Button title="BUY" modal={true} width="176px" onClick={()=> nftProccesing(true)} />
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
