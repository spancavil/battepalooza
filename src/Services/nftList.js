const nfts = [
  {
    id: 1,
    rare: 'COMMON',
    title1: 'White Mint Kumarin',
    title2: 'Can be used in Battlepalooza',
    seller: 'Jane#7894',
    price: 1900,
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/img/nft/kumarin.png'),
    source: require ('./Videos/Characters/Kumarin/whiteMintCommon.mp4'),
    serial: 2839,
  },
  {
    id: 2,
    title1: 'Medic Crappy Box',
    title2: 'Can be used in Battlepalooza',
    seller: 'Jane#7894',
    price: 2000,
    rare: 'COMMON',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/img/nft/crappyBox.png'),
    source: require ('./Videos/Characters/CrappyBox/medicBox.mp4'),
    serial: 2839,
  },
  {
    id: 3,
    title1: 'Helsing Tani',
    rare: 'RARE',
    title2: 'Can be used in Battlepalooza',
    seller: 'Jane#7894',
    price: 2000,
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/img/nft/tani.png'),
    source: require ('./Videos/Characters/Tani/helsing.mp4'),
    serial: 2839,
  },
  {
    id: 4,
    rare: 'COMMON',
    title1: 'Blue Jacket Marty',
    title2: 'Can be used in Battlepalooza',
    seller: 'Jane#7894',
    price: 2000,
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/img/nft/marty.png'),
    source: require ('./Videos/Characters/Marty/blueJacket.mp4'),
    serial: 2839,
  },
  {
    id: 5,
    title1: 'Purple BearMax',
    title2: 'Can be used in Battlepalooza',
    seller: 'Jane#7894',
    price: 2000,
    rare: 'LEGENDARY',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/img/nft/bearMax.png'),
    source: require ('./Videos/Characters/CyborgTed/purpleMax.mp4'),
    serial: 2292,
  },
  {
    id: 6,
    rare: 'COMMON',
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Robert#7894',
    price: 2767,
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 2100,
  },
  {
    id: 7,
    rare: 'COMMON',
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Fran#7894',
    price: 4000,
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 2999,
  },
  {
    id: 8,
    rare: 'EPIC',
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Obiwan#7894',
    price: 4500,
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 1293,
  },
  {
    id: 9,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Clayperion#1194',
    price: 5210,
    rare: 'LEGENDARY',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 1231,
  },
  {
    id: 10,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Klima#7894',
    price: 9200,
    rare: 'LEGENDARY',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 9928,
  },
  {
    id: 11,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Paul#7894',
    price: 10000,
    rare: 'LEGENDARY',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 8872,
  },
  {
    id: 12,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Mauro#7894',
    price: 12000,
    rare: 'RARE',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 7281,
  },
  {
    id: 13,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Jane#7894',
    price: 21000,
    rare: 'RARE',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 8721,
  },
  {
    id: 14,
    rare: 'RARE',
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'HarryElSucio#7894',
    price: 25000,
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 1192,
  },
  {
    id: 15,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Kaka#7894',
    price: 30000,
    rare: 'COMMON',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 2175,
  },
  {
    id: 16,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Dow#7894',
    price: 50000,
    rare: 'RARE',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 2812,
  },
  {
    id: 17,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Dow#7894',
    price: 50000,
    rare: 'RARE',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 2812,
  },
  {
    id: 18,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Dow#7894',
    price: 50000,
    rare: 'RARE',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 2812,
  },
  {
    id: 19,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Dow#7894',
    price: 50000,
    rare: 'RARE',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 2812,
  },
  {
    id: 20,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Dow#7894',
    price: 50000,
    rare: 'RARE',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 2812,
  },
  {
    id: 21,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Dow#7894',
    price: 50000,
    rare: 'RARE',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 2812,
  },
  {
    id: 22,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Dow#7894',
    price: 50000,
    rare: 'RARE',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 2812,
  },
  {
    id: 23,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Dow#7894',
    price: 50000,
    rare: 'RARE',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 2812,
  },
  {
    id: 24,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Dow#7894',
    price: 50000,
    rare: 'RARE',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 2812,
  },
  {
    id: 25,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Dow#7894',
    price: 50000,
    rare: 'RARE',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 2812,
  },
  {
    id: 26,
    title1: 'Rare Skin for Letti',
    title2: 'Can be used in Battlepalooza',
    seller: 'Dow#7894',
    price: 50000,
    rare: 'RARE',
    lowestPrice: 1900,
    highestPrice: 50000,
    imgSrc: require ('../Assets/sprites/cardnft01.png'),
    source: require ('./Videos/Characters/Letti/Tronrider_Rare_1.mp4'),
    serial: 2812,
  },
];

export default nfts;
