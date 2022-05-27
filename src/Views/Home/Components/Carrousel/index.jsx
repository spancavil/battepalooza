import { useEffect, useState, useContext } from "react";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { NftData } from "../../../../Context/NftProvider";
import Button from "../../../../Global-Components/Button";
import dropService from "../../../../Services/drop.service";
import Card from "./components/Card";

import styles from "./styles.module.scss";

const CarrouselCards = () => {

  const { drops } = useContext(NftData);
  const { mainDrop } = drops;
  
  const [nftsMainDrop, setNftsMainDrop] = useState([])

  const history = useHistory();
  
  useEffect(() => {

    (async () => {
      const dropDetail = await dropService.getDropDetail(
        "",
        parseInt(mainDrop.id)
      );
      setNftsMainDrop(dropDetail.nftProducts || []);
    })()

  }, [mainDrop])

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  const handleDetail = () => {
    history.push(`/drop/${mainDrop.id}`);
  };

  return (
    <div className={styles.container}>
      <Carousel enableAutoPlay breakPoints={breakPoints} autoPlaySpeed={3000}>
        {nftsMainDrop.map((nft) => (
          <Card key={nft.uniqueId} nft={nft} onClick={handleDetail} />
        ))}
      </Carousel>
      <div className={styles.btnContainer}>
        <Link to="/drop">
          <Button title={"VIEW ALL DROPS"} />
        </Link>
      </div>
    </div>
  );
};

export default CarrouselCards;
