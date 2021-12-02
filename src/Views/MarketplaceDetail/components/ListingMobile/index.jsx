import React from 'react';
import {useEffect, useState} from 'react/cjs/react.development';
import ModalMobile from './Modal/index';
import styles from './styles.module.scss';

const ListingMobile = ({handleClose, nfts, nftSelected, setNft}) => {
  const [nftListing, setNftListing] = useState ([]);

  useEffect (
    () => {
      //Lógica para filtrar a los NFTS según su descripcion y ordenar por precio
      const nftsFiltrados = nfts.filter (
        nft => nft.title1 === 'Rare Skin for Letti'
      );
      nftsFiltrados.sort ((a, b) => a.price - b.price);
      setNftListing (nftsFiltrados);
    },
    [nfts, nftSelected]
  );

  const handleBuy = nft => {
    console.log (nft);
    setNft (nft);
  };

  return (
    <div className={styles.listingMobileContainer}>
      <ModalMobile handleClose={handleClose}>
        <h3>
          Tron Warrior Full Listing
        </h3>
        <div className={styles.container}>
          {nftListing.map ((nft) => (
            <div key={nft.id}>
              <div className={styles.top}>
                <div className={styles.infoContainer}>
                  <h5 className={styles.title}>
                    Serial#
                  </h5>
                  <div className={styles.info}>
                    #{nft.serial}
                  </div>
                </div>
                <div className={styles.infoContainer}>
                  <h5 className={styles.title}>
                    NCoin
                  </h5>
                  <div className={styles.info}>
                    {nft.price}
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.seller}>
                  <h5 className={styles.title}>
                    Seller
                  </h5>
                  <div className={styles.info}>
                    {nft.seller}
                  </div>
                </div>
              </div>
              <button onClick={() => handleBuy (nft)}>
                BUY
              </button>
              <hr />
            </div>
          ))}
        </div>
      </ModalMobile>
    </div>
  );
};

export default ListingMobile;
