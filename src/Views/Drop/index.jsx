import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Background from '../../Global-Components/Background';
import { dropsList } from '../../Services/dropList';
import styles from './styles.module.scss';
import Button from '../../Global-Components/Button';

const Drop = () => {
  const charEsc = '<';

  const history = useHistory();
  const [olderDrops, setOlderDrops] = useState([]);
  const [hero, setHero] = useState({});

  const divHero = useRef()
  const divsOlder = useMemo(() => (olderDrops.map(() => createRef())), [olderDrops])

  //set data for drops
  useEffect(() => {
    const hero = dropsList.filter(drop => drop.dropOrder === 1)[0];
    const olderDrops = dropsList.filter(drop => drop.dropOrder !== 1);
    setHero(hero)
    setOlderDrops(olderDrops)
  }, [setHero, setOlderDrops])

  //Set backgrounds with useRef
  useEffect(() => {

    if (hero.length !== 0 && olderDrops.length !== 0 && divsOlder.length !== 0) {
      divHero.current.style.backgroundImage = `url(${hero.heroBannerImage})`;
      for (const drop of olderDrops) {
        const index = olderDrops.findIndex(element => element.id === drop.id);
        if (divsOlder[index]?.current) divsOlder[index].current.style.backgroundImage = `url(${drop.smallBannerImage})`;
      }
    }
  }, [divHero, divsOlder, hero, olderDrops])

  const handleDetail = (id) => {
    history.push(`/drop/${id}`)
  }

  const handleFindOut = () => {
  }

  return (
    <Background>
      <div className={styles.content2}>
        <p className={styles.goBack}> {charEsc} Go back</p>
        <p className={styles.title}>DROP</p>
        <div className={styles.rectangle}>

          <div className={styles.hero} ref={divHero}>
            <div className={styles.informaton}>
              <h2 className={styles.release} style={{ padding: '55px 0px 8px 0px' }}>Release date {new Date(hero?.release).toLocaleDateString()}</h2>
              <h2 className={styles.name} style={{ padding: '0px 0px 12px 0px' }}>{hero?.name}</h2>
              <h2 className={styles.roboto} style={{ padding: '0px 0px 20px 0px' }}>{hero?.description} </h2>
              <Button
                title="Find out more"
                width={'227px'}
                onClick={handleFindOut}
                style={{
                  fontSize: '24px'
                }}
              />
            </div>
            <div className={styles.mainImages}>
              {hero?.content?.map(nft => {
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
              })}
            </div>
          </div>

          <div className={styles.olderTitle}>
            <h3 className={styles.older}>Older drops</h3>
            <div className={styles.allContainer}>
              <h3 className={styles.all}>View all drops</h3>
              <div className={styles.line}></div>
            </div>
          </div>

          <div className={styles.cards}>
            {olderDrops.length !== 0 && olderDrops.map(drop => {
              const indice = olderDrops.findIndex(element => element.id === drop.id);
              return (
                <div className={styles.cardNft} key={drop.id} ref={divsOlder[indice]} onClick={() => handleDetail(drop.id)}>
                  <div className={styles.texts}>
                    <h2 className={styles.release} style={{ padding: '12px 0 8px 0' }}>Release date {new Date(drop.release).toLocaleDateString()}</h2>
                    <h2 className={styles.name}>{drop.name}</h2>
                  </div>
                  <div className={styles.imagesContainer}>
                    {drop.content.map(nft => {
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
                    })}
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
