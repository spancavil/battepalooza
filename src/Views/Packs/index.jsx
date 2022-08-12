import React, { useContext, useState, useRef, useEffect } from "react";
import Background from "../../Global-Components/Background";
import SocialMedia from "../Home/Components/SocialMedia";
import styles from "./styles.module.scss";
import Card from "../../Global-Components/Card";
import { PackData } from "../../Context/PackProvider";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import { useHistory } from "react-router-dom";

import ScrollBar from "../../Global-Components/ScrollBar";
import { HD, MOBILE_1 } from "../../Constants/definitions";

/* NO SE ESTA USANDO ESTE COMPONENTE, E IBA EN LA RUTA /packs */
const Packs = () => {
  const { packs, setPack, packData } = useContext(PackData);

  const [scroll, setScroll] = useState({ scrollLeft: "", scrollWidth: "" });
  const queryTablet = useMediaQuery("(max-width: 766px)");
  /* const userStorage = JSON.parse(localStorage.getItem("userBP")); */

  const divHero = useRef();
  const history = useHistory();

  const mobile = useMediaQuery(`(max-width: ${MOBILE_1})`);
  const hd = useMediaQuery(`(min-width: ${HD})`);

  const setSelectedCard = (packId) => {
    setPack(packId);
    history.push(`/packs/${packId}`);
  };

  const handleScroll = (e) => {
    setScroll({
      scrollLeft: e.target.scrollLeft,
      scrollWidth: e.target.scrollWidth - e.target.offsetWidth,
    });
  };

  //Set backgrounds with useRef
  useEffect(() => {
    if (packData?.packInfo !== 0) {
      divHero.current.style.backgroundImage = mobile
        ? `url(${packData?.packInfo?.BannerUrl})`
        : `url(${packData?.packInfo?.BannerUrl})`;
      divHero.current.style.backgroundSize = "cover";
      divHero.current.style.backgroundRepeat = "no-repeat";
      divHero.current.style.backgroundPosition = hd ? "" : "60% 50%";
    }
  }, [divHero, packData, mobile, hd]);

  /* 
  {
            "id": "pack-1-290",
            "price": 50000,
            "limitAmount": 100000,
            "leftAmount": 100000,
            "repurchaseLimit": 1000,
            "purchasedCnt": 0,
            "packId": 5,
            "packName": "Premium Pack #1",
            "detailTxt": "Randomly get 1 Premium Item upon purchase. \\nLimited to 1 per player.",
            "thumbnailUrl": "https://battlepalooza-web.s3.amazonaws.com//thumbnails/packs/Sprite_Shop_Cardpack_05.png",
            "openMovieUrl": "https://battlepalooza-web.s3.amazonaws.com/movieClips/packs/CardPack_Edition_1.mp4",
            "randomWeights": {
                "1": 58000,
                "2": 30003,
                "3": 9996,
                "4": 1999
            }
  },
  */

  /* 
  {packs.map((pack) => {
            return (
              <Card
                key={pack.id}
                imgSrc={pack.imgSrc}
                text1={pack.description.text1}
                text2={pack.description.text2}
                text3={pack.description.text3}
                soldOut={pack.soldOut}
                sale={pack.sale}
                handleClick={() => setSelectedCard(pack.id)}
              />
            );
  })}
  */

  return (
    <Background>
      <div className={styles.packContainer}>
        <div className={styles.banner} ref={divHero}></div>
        <h4>SKINS PACKS</h4>
        <div className={styles.cardContainer} onScroll={handleScroll}>
          {packData?.nftPackProducts?.map((pack) => {
            return (
              <Card
                key={pack.id}
                imgSrc={pack.thumbnailUrl}
                text1={pack.packName}
                text2={pack.detailTxt}
                /* text3={pack.description.text3} */
                /* soldOut={pack.soldOut}
                sale={pack.sale} */
                handleClick={() => setSelectedCard(pack.id)}
              />
            );
          })}
        </div>
        {queryTablet && (
          <ScrollBar
            width={scroll.scrollWidth}
            position={scroll.scrollLeft}
            elements={packs.length}
          />
        )}
        <SocialMedia />
      </div>
    </Background>
  );
};

export default Packs;
