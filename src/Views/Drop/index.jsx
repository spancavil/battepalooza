import React, { createRef, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Background from '../../Global-Components/Background';
// import { dropsList } from '../../Services/dropList';
import styles from './styles.module.scss';
import Button from '../../Global-Components/Button';
import { NftData } from '../../Context/NftProvider';
import heroBannerImage from '../../Assets/img/dropHeroBg.png';
import heroBannerSecondary from '../../Assets/img/bg-secondary-drop.png';
import heroBannerImageMobile from '../../Assets/img/bg-drop-mobile.png';
import { getDaysMinutesSeconds } from '../../Utils/createDate';
import { useMediaQuery } from '../../Hooks/useMediaQuery';

const Drop = () => {
  const charEsc = '<';

  const { drops } = useContext(NftData);

  const history = useHistory();
  const [olderDrops, setOlderDrops] = useState([]);
  const [hero, setHero] = useState({});
  const [timerRelease, setTimerRelease] = useState({ message: "", state: "" })
  const mobile = useMediaQuery('(max-width: 991px)');

  console.log(mobile);

  const divHero = useRef()
  const divsOlder = useMemo(() => (olderDrops.map(() => createRef())), [olderDrops])

  //set data for drops
  useEffect(() => {
    let intervalTimer;
    if (drops.length !== 0) {
      const hero = drops.mainDrop;
      const olderDrops = drops.prevDropList;
      setHero(hero)
      setOlderDrops(olderDrops)

      //Sandbox
      // const {message, state} = getDaysMinutesSeconds(Date.now() + 2016000010, Date.now() + 172800000);
      intervalTimer = setInterval(() => {
        const date = getDaysMinutesSeconds(drops.mainDrop.startTime, drops.mainDrop.endTime)
        const { message, state } = date;
        setTimerRelease({ message, state });
        if (state !== ("active" || "willBeActive")) clearInterval(intervalTimer);
      }, 1000
      )
    }
    return () => {
      console.log("Unmounted Drop");
      clearInterval(intervalTimer)
    }
  }, [setHero, setOlderDrops, drops, setTimerRelease])

  //Set backgrounds with useRef
  useEffect(() => {

    if (hero.length !== 0 && olderDrops.length !== 0 && divsOlder.length !== 0) {
      divHero.current.style.backgroundImage = mobile ? `url(${heroBannerImageMobile})` : `url(${heroBannerImage})`;
      for (const drop of olderDrops) {
        const index = olderDrops.findIndex(element => element.id === drop.id);
        if (divsOlder[index]?.current) divsOlder[index].current.style.backgroundImage = `url(${heroBannerSecondary})`;
      }
    }
  }, [divHero, divsOlder, hero, olderDrops, mobile])

  const handleDetail = (id) => {
    history.push(`/drop/${id}`)
  }

  const handleFindOut = () => {
    history.push(`/drop/1`)
  }

  return (
    <Background>
      <div className={styles.content2}>
        <p className={styles.goBack} onClick={() => history.push('/')}> {charEsc} Go back</p>
        <p className={styles.title}>DROP</p>
        <div className={styles.rectangle}>

          <div className={styles.hero} ref={divHero}>
            <div className={styles.information}>
              {mobile && <img
                src={heroBannerSecondary}
                alt="Hero"
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  bottom: '0',
                }}
              />}
              <h2 className={styles.release}>Release date {new Date(hero?.startTime).toLocaleDateString()}</h2>
              <h2 className={styles.name}>{hero?.name}</h2>
              <h2 className={styles.roboto}>{hero?.desc} </h2>
              <div className={styles.findOut}>
                <Button
                  title="Find out more"
                  width={'227px'}
                  onClick={handleFindOut}
                  style={{
                    fontSize: '24px'
                  }}

                />
                <h5 className={styles.available}>{timerRelease.message}</h5>

              </div>
            </div>
            <div className={styles.mainImages}>
              {/* {hero?.content?.map(nft => {
                return (
                  <img
                    key={nft.thumbnailUrl}
                    src={nft.thumbnailUrl}
                    style={{
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    alt="nft"
                  />
                )
              })} */}
            </div>
          </div>

          <div className={styles.olderTitle}>
            <h3 className={styles.older}>Older drops</h3>
            {/* <div className={styles.allContainer}>
              <h3 className={styles.all}>View all drops</h3>
              <div className={styles.line}></div>
            </div> */}
          </div>

          <div className={styles.cards}>
            {olderDrops.length !== 0 && olderDrops.map(drop => {
              const indice = olderDrops.findIndex(element => element.id === drop.id);
              return (
                <div className={styles.cardNft} key={drop.id} ref={divsOlder[indice]} onClick={() => handleDetail(drop.id)}>
                  <div className={styles.texts}>
                    <h2 className={styles.release} style={{ padding: '12px 0 8px 0' }}>Release date {new Date(drop.startTime).toLocaleDateString()}</h2>
                    <h2 className={styles.name}>{drop.name}</h2>
                  </div>
                  <div className={styles.imagesContainer}>
                    {/* {drop.content.map(nft => {
                      return (
                        <img
                          key={nft.thumbnailUrl}
                          src={nft.thumbnailUrl}
                          style={{
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          alt="nft"
                        />
                      )
                    })} */}
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </Background>
  );
};

export default Drop;
