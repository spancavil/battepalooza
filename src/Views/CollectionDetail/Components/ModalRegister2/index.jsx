import React, { useEffect, useState, useContext } from 'react';
import Modal from '../../../../Global-Components/Modal';
import Button from '../../../../Global-Components/Button';
import styles from './styles.module.scss';
import marketService from '../../../../Services/market.service';
import { useHistory } from 'react-router-dom';
import { NftData } from '../../../../Context/NftProvider';
import checkErrorMiddleware from '../../../../Utils/checkErrorMiddleware';

const ModalRegister2 = ({setmodalRegister2, handleMarket, forteTxText, bpToken, pid, setReloadDetail}) => {
  
  const [status, setStatus] = useState("")
  const [transactionType, setTransactionType] = useState("")
  const history = useHistory();
  const {setReloadCollection} = useContext(NftData);
  
  useEffect(()=> {

    const getStatusForte = async () => {

      console.log(`Forteid: ${forteTxText}, Status: ${status}`);

      try {
        const response = await marketService.getTransactionStatus(
          pid, 
          forteTxText,
          bpToken,
        ) 
        const canContinue = checkErrorMiddleware(response, history);
        if (canContinue) {

        //Response OK, no errors
          setStatus(response.status);
          setTransactionType(response.txType);
        }
        
      } catch (error) {
        setStatus("Oops, an error ocurred", error.message, '500px');
      }
    }

    //We call the status of the transaction in forte each 0.5 secs
    const forteStatusInterval = setInterval(getStatusForte, 500);
    if (status !== "pending" && status !== "") {
      clearInterval(forteStatusInterval)
    }
    //Interval clear at component will unmount
    return ()=> {
      clearInterval(forteStatusInterval)
    }

  }, [forteTxText, status, bpToken, history, pid])

  const handleCloseModal = () => {
    setReloadCollection(value => !value)
    setReloadDetail(value => !value)
    setmodalRegister2(false)
  }

  return (
    <div className={styles.parentContainerModal}>
    <Modal
      title="Confirmation"
      handleClose={() => setmodalRegister2(false)}
    >
    {status === "completed" ?
    <>
      <h3 className={styles.textDrop}>
        {/* Imprimimos UNregistered si el código de transacción es el de borrar del market (cancelSelling) */}
        The NFT has been {transactionType.includes("delete") && "un"}registered <br />
        for sale in the Marketplace
      </h3>
      <div
        style={{ paddingBottom: "25px" }}
        className={styles.buttonsContainer}
      >
        <Button
          modal={true}
          title="MARKETPLACE"
          width="198px"
          onClick={handleMarket}
        />
        <Button
          modal={true}
          title="CONFIRM"
          width="198px"
          onClick={() => handleCloseModal()}
        />
      </div>
    </>
    :
    <h3 className={styles.textDrop}>
        Status: <br />
        {status}
    </h3>
    }
    </Modal>
  </div>
  );
};

export default ModalRegister2;
