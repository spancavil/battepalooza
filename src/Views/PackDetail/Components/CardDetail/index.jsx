import React, { useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Button from '../../../../Global-Components/Button';
import { useHistory, useParams } from 'react-router';
import { CardData } from '../../../../Context/CardDataProvider';

const CardDetail = () => {
  const {packs, setPack} = useContext(CardData);
  const {id} = useParams();
  const [pack, setSelectedPack] = useState();
  const history = useHistory()

  useEffect(()=> {
    const selectedPack = packs.find(pack => pack.id === Number(id));
    setSelectedPack(selectedPack);
    setPack(selectedPack);
  }, [id, packs, setPack])

  const handleJoin = () => {
    history.push('/join-drop');
  }

  return (
    <>
    {
      pack &&
      <div className={styles.card}>
      <div className={styles.imgContainer}>
        <img src={pack.imgSrc} alt="pack" />
      </div>
      <div className={styles.text}>
        <h3 className={styles.rare}>
          {pack.description.text1} {pack.description.text2} <br /> {pack.stock} Pack Left
        </h3>
        <p>You will be able to obtain the following through this pack:</p>
        <ul>
          <li>
            {pack.content[0]}
          </li>
          <li>
            {pack.content[1]}           
          </li>
        </ul>
        <h3 className={styles.price}>Price {pack.price} NCoin</h3>
        <Button 
        title="JOIN DROP"
        onClick = {handleJoin}
        />
      </div>
    </div>
    }
    </>
  );
};

export default CardDetail;
