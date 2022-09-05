import { getDaysMinutesSeconds } from "../../Utils/createDate";
import { RemainingPack } from "./components/RemainingPack";
import  { useContext, useState, useEffect } from "react";
import { PackData } from "../../Context/PackProvider";
import { FirstPack } from "./components/FirstPack";
import { useHistory } from "react-router-dom";

import Background from "../../Global-Components/Background";
import Footer from "../../Global-Components/Footer";
import styles from "./styles.module.scss";

const Packs = () => {
  const [timerRelease, setTimerRelease] = useState({ message: "", state: "" });
  
  const { setPack, packData } = useContext(PackData);
  const history = useHistory();

  useEffect(() => {
    let intervalTimer;
    if (packData?.packInfo?.length !== 0) {
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

  const setSelectedCard = (packId) => {
    setPack(packId);
    history.push(`/packs/${packId}`);
  };

  const handleFindOut = () => {
    history.push(`/packs/${packData?.packInfo?.id}`);
  };

  return (
    <Background>
      <section className={styles.packsSection}>
        <h4>PACKS</h4>

        <div className={styles.packs}>
          <FirstPack
            onClick={handleFindOut}
            packData={packData}
            timerRelease={timerRelease}
          />

          <div className={styles.remainingPacks}>
            {packData?.nftPackProducts?.map((pack) => {
              return (
                <RemainingPack
                  onClick={setSelectedCard}
                  key={pack.id}
                  pack={pack}
                />
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </Background>
  );
};

export default Packs;
