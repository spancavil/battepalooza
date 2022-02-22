import React, { useEffect, useState } from 'react';
import Modal from '../../../../Global-Components/Modal';
import Button from '../../../../Global-Components/Button';
import styles from './styles.module.scss';
import marketService from '../../../../Services/market.service';
import { logOutAmplitude } from '../../../../Utils/amplitude';
import { fireAlertAsync } from '../../../../Utils/sweetAlert2';
import { useHistory } from 'react-router-dom';

const ModalRegister2 = ({setmodalRegister2, handleMarket, forteTxText, bpToken, pid}) => {
  
  const [status, setStatus] = useState("")
  const [transactionType, setTransactionType] = useState("")
  const history = useHistory();
  
  useEffect(()=> {

    const getStatusForte = async () => {

      console.log(`Forteid: ${forteTxText}, Status: ${status}`);

      try {
        const response = await marketService.getTransactionStatus(
          pid, 
          forteTxText,
          bpToken,
        ) 
        if (response.error.text !== "") {
          if (response.error.text.includes("authorized")) {
            fireAlertAsync("Warning","Session expired, please login again.")
            .then(()=> {
              localStorage.removeItem("userBP");
              logOutAmplitude();
              history.push("/");
              window.location.reload();
            })
          } else {
            setStatus("Oops, an error ocurred", response.error.text, '500px');
          }
        } else {

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
          onClick={() => setmodalRegister2(false)}
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
