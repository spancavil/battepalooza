import { useEffect, useState, useContext } from "react";
import InfiniteCarousel from 'react-leaf-carousel'
// import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { NftData } from "../../../../Context/NftProvider";
import Button from "../../../../Global-Components/Button";
import dropService from "../../../../Services/drop.service";
import Card from "./components/Card";
import NextArrow from "./components/NextArrow";
import PrevArrow from "./components/PrevArrow";

import styles from "./styles.module.scss";

const CarrouselCards = () => {
  const { drops } = useContext(NftData);
  const { mainDrop } = drops;

  const [nftsMainDrop, setNftsMainDrop] = useState([]);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const dropDetail = await dropService.getDropDetail(
        "",
        parseInt(mainDrop?.id)
      );
      setNftsMainDrop(dropDetail.nftProducts || []);
    })();
  }, [mainDrop]);

  const breakPoints = [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1400,
      setting: {
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    }
  ];

  const handleDetail = () => {
    history.push(`/drop/${mainDrop.id}`);
  };

  return (
    <div className={styles.container}>
      {nftsMainDrop.length !== 0 && (
        <InfiniteCarousel
          breakpoints={breakPoints}
          showSides={true}
          nextArrow = {<NextArrow/>}
          prevArrow = {<PrevArrow/>}
          sidesOpacity={0.5}
          sideSize={0.1}
          slidesToScroll={1}
          slidesToShow={5}
          swipe={true}
        >
          {nftsMainDrop.map((nft) => (
            <Card key={nft.uniqueId} nft={nft} onClick={handleDetail} />
          ))}
        </InfiniteCarousel>
      )}
      <div className={styles.btnContainer}>
        <Link to="/drop">
          <Button title={"VIEW ALL DROPS"} />
        </Link>
      </div>
    </div>
  );
};

export default CarrouselCards;
