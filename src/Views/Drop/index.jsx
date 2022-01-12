import React from 'react';
import {Link} from 'react-router-dom';
import Background from '../../Global-Components/Background';
import {dropsList} from '../../Services/dropList';
import styles from './styles.module.scss';

const Drop = () => {
  const charEsc = '<';

  return (
    <Background>
      <div className={styles.content2}>
        <p className={styles.goBack}> {charEsc} Go back</p>
        <p className={styles.title}>DROP</p>
        <div className={styles.rectangle}>
            <div className={styles.cards}>
              {dropsList.map (drop => (
                <Link
                  style={{textDecoration: 'none', overflow: 'visible', display: 'flex', justifyContent: 'center'}}
                  to={`/drop/${drop.id}`}
                  key={drop.id}
                >
                  <div className={styles.cardNft} key={drop.id}>
                    <img className={styles.imgNft} src={drop.img} alt="nft" />
                    <div className={styles.texts}>
                      <p>{drop.title} </p>
                      <p className={styles.text2}>{drop.subtitle}</p>
                      <p className={styles.price}>{drop.quantity}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
    </Background>
  );
  // <Background>
  //   <div className={styles.container}>
  //     <div className={styles.gradient}>
  //       <div className={styles.cardsContainer}>
  //         <div className={styles.cards}>
  //           {dropsList.map (drop => (
  //             <Link
  //               style={{textDecoration: 'none', overflow: 'visible'}}
  //               to={`/drop/${drop.id}`}
  //               key={drop.id}
  //             >
  //               <div className={styles.cardNft} key={drop.id}>
  //                 <img className={styles.imgNft} src={drop.img} alt="nft" />
  //                 <div className={styles.texts}>
  //                   <p>{drop.title} </p>
  //                   <p className={styles.text2}>{drop.subtitle}</p>
  //                   <p className={styles.price}>{drop.quantity}</p>
  //                 </div>
  //               </div>
  //             </Link>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </Background>
};

export default Drop;
