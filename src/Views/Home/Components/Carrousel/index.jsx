import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "../../../../Global-Components/Button";
import Card from "./components/Card";

import styles from "./styles.module.scss";

const CarrouselCards = () => {
  const items = [
    {
      uniqueId: "1376646261177839446058895741306581577315354794160",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 30000,
      type: 2,
      itemId: 1081,
      itemName: "Golden striker",
      repName: "Glove",
      rarity: "Legendary",
      clan: "SYN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/GoldenStriker_Legendary.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_32_Pre3.png",
      maxPlayCount: 345,
    },
    {
      uniqueId: "1376646261177839446058895741306581577315354794161",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 30000,
      type: 2,
      itemId: 1081,
      itemName: "Golden striker",
      repName: "Glove",
      rarity: "Legendary",
      clan: "SYN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/GoldenStriker_Legendary.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_32_Pre3.png",
      maxPlayCount: 345,
    },
    {
      uniqueId: "1376646261177839446058895741306581577315354794162",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 30000,
      type: 2,
      itemId: 1081,
      itemName: "Golden striker",
      repName: "Glove",
      rarity: "Legendary",
      clan: "SYN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/GoldenStriker_Legendary.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_32_Pre3.png",
      maxPlayCount: 345,
    },
    {
      uniqueId: "1376646261177839446058895741306581577315354794163",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 30000,
      type: 2,
      itemId: 1081,
      itemName: "Golden striker",
      repName: "Glove",
      rarity: "Legendary",
      clan: "SYN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/GoldenStriker_Legendary.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_32_Pre3.png",
      maxPlayCount: 345,
    },
    {
      uniqueId: "1376646261177839446058895741306581577315354794164",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 30000,
      type: 2,
      itemId: 1081,
      itemName: "Golden striker",
      repName: "Glove",
      rarity: "Legendary",
      clan: "SYN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/GoldenStriker_Legendary.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_32_Pre3.png",
      maxPlayCount: 345,
    },
    {
      uniqueId: "1376646261177839446058895741306581577315354794165",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 30000,
      type: 2,
      itemId: 1081,
      itemName: "Golden striker",
      repName: "Glove",
      rarity: "Legendary",
      clan: "SYN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/GoldenStriker_Legendary.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_32_Pre3.png",
      maxPlayCount: 345,
    },
    {
      uniqueId: "1376646261177839446058895741306581577315354794166",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 30000,
      type: 2,
      itemId: 1081,
      itemName: "Golden striker",
      repName: "Glove",
      rarity: "Legendary",
      clan: "SYN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/GoldenStriker_Legendary.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_32_Pre3.png",
      maxPlayCount: 345,
    },
    {
      uniqueId: "1376646261177839446058895741306581577315354794167",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 30000,
      type: 2,
      itemId: 1081,
      itemName: "Golden striker",
      repName: "Glove",
      rarity: "Legendary",
      clan: "SYN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/GoldenStriker_Legendary.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_32_Pre3.png",
      maxPlayCount: 345,
    },
  ];

  const history = useHistory();

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  const handleDetail = (uniqueId, sellerPid) => {
    history.push(`/marketplace/${uniqueId}-${sellerPid}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        <Link to="/drop">
          <Button title={"DROPS"} />
        </Link>
      </div>
      <Carousel enableAutoPlay breakPoints={breakPoints} autoPlaySpeed={3000}>
        {items.map((nft) => (
          <Card key={nft.uniqueId} nft={nft} onClick={handleDetail} />
        ))}
      </Carousel>
    </div>
  );
};

export default CarrouselCards;
