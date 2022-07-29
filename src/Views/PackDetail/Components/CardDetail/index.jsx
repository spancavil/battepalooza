import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useParams } from "react-router";
import { CardData } from "../../../../Context/CardDataProvider";
import Button from "../../../../Global-Components/Button";
import fireToast, { fireAlert, fireAlertAsync } from "../../../../Utils/sweetAlert2";
import { UserData } from "../../../../Context/UserProvider";
import walletService from "../../../../Services/wallet.service";
import { logOutAmplitude } from "../../../../Utils/amplitude";
import { useHistory } from 'react-router-dom';

const CardDetail = () => {
  const { packs, setPack } = useContext(CardData);
  const { id } = useParams();
  const [pack, setSelectedPack] = useState();
  const { userData } = useContext(UserData);
  const history = useHistory()

  useEffect(() => {
    const selectedPack = packs.find((pack) => pack.id === Number(id));
    setSelectedPack(selectedPack);
    setPack(selectedPack);
  }, [id, packs, setPack]);

  const handleBuy = async () => {
    if (Object.keys(userData).length !== 0) {
      try {
        const response = await walletService.getWalletToken(
          userData.bpToken,
          userData.email,
          userData.pid)
        console.log(response);
        if (response.error.num !== 0) {
          if (response.error.text.includes("authorized")) {
            fireAlertAsync("Session expired, please login again.")
              .then(() => {
                localStorage.removeItem("userBP");
                logOutAmplitude();
                history.push("/");
                window.location.reload();
              })
          } else {
            fireAlert("Oops, an error ocurred", response.error.text, '500px');
          }
          //Everything OK
        } else {
          const { token } = response;
          const popup = window.open(
            `${process.env.REACT_APP_NWAY_URL}token=${token}&${process.env.REACT_APP_NWAY_URL_TITLE}`,
            "Wallet payment",
            'top=50,left= 200,width=800,height=620'
          )

          //Intervalo para detectar el cierre del popup
          const popupTick = setInterval(() => {
            if (popup.closed) {
              console.log("se cerro la window");
              fireAlert("Closed the token payment wallet window", "", '500px');
              clearInterval(popupTick);
            }
          }, 500)

        }
      } catch (error) {
        fireAlert("Oops, an error ocurred", error.message, '500px');
      }

    } else {
      fireToast("Need login", 1200, "300px");
    }
  };

  return (
    <>
      {pack && (
        <div className={styles.card}>
          <div className={styles.imgContainer}>
            <img src={pack.imgSrc} alt="pack" />
          </div>
          <div className={styles.text}>
            <h3 className={styles.rare}>
              {pack.description.text1} {pack.description.text2} <br />{" "}
              {pack.stock} Pack Left
            </h3>
            <p>You will be able to obtain the following through this pack:</p>
            <ul>
              <li>{pack.content[0]}</li>
              <li>{pack.content[1]}</li>
            </ul>
            <h3 className={styles.price}>Price {pack.price} NCoin</h3>
            <Button onClick={handleBuy} title={"BUY"} />
          </div>
        </div>
      )}
    </>
  );
};

export default CardDetail;
