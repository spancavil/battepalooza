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
import Button from "../../Global-Components/Button";
import { getDaysMinutesSeconds } from "../../Utils/createDate";

/* NO SE ESTA USANDO ESTE COMPONENTE, E IBA EN LA RUTA /packs */
const Packs = () => {
  const { packs, setPack, packData } = useContext(PackData);

  const [scroll, setScroll] = useState({ scrollLeft: "", scrollWidth: "" });
  const [timerRelease, setTimerRelease] = useState({ message: "", state: "" });
  const queryTablet = useMediaQuery("(max-width: 766px)");
  /* const userStorage = JSON.parse(localStorage.getItem("userBP")); */

  const divHero = useRef();
  const history = useHistory();

  useEffect(() => {
    let intervalTimer;
    if (packData?.packInfo?.length !== 0) {
      //Sandbox
      // const {message, state} = getDaysMinutesSeconds(Date.now() + 2016000010, Date.now() + 172800000);
      intervalTimer = setInterval(() => {
        const date = getDaysMinutesSeconds(
          packData?.packInfo?.startTime,
          packData?.packInfo?.endTime
        );
        const { message, state } = date;
        setTimerRelease({ message, state });
        if (state !== ("active" || "willBeActive"))
          clearInterval(intervalTimer);
      }, 1000);
    }
    return () => {
      console.log("Unmounted Drop");
      clearInterval(intervalTimer);
    };
  }, [
    packData?.packInfo?.endTime,
    packData?.packInfo?.startTime,
    packData?.packInfo?.length,
  ]);

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

  const handleFindOut = () => {
    history.push(`/packs/${packData?.packInfo?.id}`);
  };

  console.log({ packData });

  return (
    <Background>
      <div className={styles.packContainer}>
        <div className={styles.hero} ref={divHero}>
          <div className={styles.information}>
            <h2 className={styles.release}>
              Release date{" "}
              {new Date(packData?.packInfo?.startTime).toLocaleDateString()}
            </h2>
            <h2 className={styles.name}>{packData?.packInfo?.name}</h2>
            <h2 className={styles.roboto}>{packData?.packInfo?.desc} </h2>
            <div className={styles.findOut}>
              <Button
                title="Find out more"
                width={"227px"}
                onClick={handleFindOut}
                style={{
                  fontSize: "24px",
                }}
              />
              <h5 className={styles.available}>{timerRelease.message}</h5>
            </div>
          </div>
        </div>

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
