import React from "react";
import { useContext, useState } from "react";
import { NftData } from "../../Context/NftProvider";
import { PackData } from "../../Context/PackProvider";
import Background from "../../Global-Components/Background";
import SocialMedia from "../Home/Components/SocialMedia";
import CardDetail from "./Components/CardDetail";
import Checkout from "./Components/Checkout";
import Complete from "./Components/Complete";
import Proccesing from "./Components/Proccesing";
import styles from "./styles.module.scss";
import { useHistory } from 'react-router-dom';

/* NO SE ESTA USANDO ESTE COMPONENTE, E IBA EN LA RUTA /packs/:id */
const PackDetail = () => {
  /* const userStorage = JSON.parse(localStorage.getItem("userBP")); */

  const [checkoutNCoin, setCheckoutNCoin] = useState(false);
  const [processingNCoin, setProcessingNcoin] = useState(false);
  const [buyComplete, setBuyComplete] = useState(false);

  const {packSelected} = useContext(PackData);
  const { setReloadCollection } = useContext(NftData);

  const history = useHistory();

  const processingComplete = () => {
    setCheckoutNCoin(false);
    setProcessingNcoin(false);
    setBuyComplete(true);
  }

  const handleCloseComplete = (destiny) => {
    setReloadCollection(value => !value)
    if (destiny === 'collection') history.push(`/${destiny}`)
    else setBuyComplete(false)
  }

  console.log(packSelected);

  return (
    <Background>
      <div className={styles.container}>
        <CardDetail 
          setCheckoutNCoin={setCheckoutNCoin}
        />
      </div>
      {checkoutNCoin &&
        <Checkout
          packBuy={packSelected}
          nftProccesing={setProcessingNcoin}
          handleClose={setCheckoutNCoin}
        />}
      {processingNCoin &&
        <Proccesing packBuy={packSelected}
          processingComplete={processingComplete}
          handleClose={() => setProcessingNcoin(false)} />}
      {buyComplete &&
        <Complete
          title={packSelected}
          goCollection={() => handleCloseComplete('collection')}
          closeComplete={() => handleCloseComplete('')}
        />}
      <SocialMedia />
    </Background>
  );
};

export default PackDetail;
