import { UserData } from "../../../../Context/UserProvider";
import { useContext } from "react";

import checkErrorMiddleware from "../../../../Utils/checkErrorMiddleware";
import walletService from "../../../../Services/wallet.service";
import NftCard from "../../../../Global-Components/NftCard";

import styles from "./styles.module.scss";
import fireToast, {
  fireAlert,
  fireAlertAsync,
} from "../../../../Utils/sweetAlert2";
import { useHistory } from "react-router-dom";

export const PackInfo = ({ pack, setCheckoutNCoin }) => {
  const { userData } = useContext(UserData);
  const history = useHistory();

  const nftsTest = [
    {
      uniqueId: "983235971287250685025551072688264024413005647533",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 17500,
      type: 2,
      itemId: 1045,
      itemName: "White killer",
      repName: "Bow",
      rarity: "Epic",
      clan: "NEN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/WhiteKiller_Epic.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_05_Pre3.png",
      maxPlayCount: 323,
    },
    {
      uniqueId: "983235971287250685025551072688264024413005647533",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 17500,
      type: 2,
      itemId: 1045,
      itemName: "White killer",
      repName: "Bow",
      rarity: "Epic",
      clan: "NEN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/WhiteKiller_Epic.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_05_Pre3.png",
      maxPlayCount: 323,
    },
    {
      uniqueId: "983235971287250685025551072688264024413005647533",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 17500,
      type: 2,
      itemId: 1045,
      itemName: "White killer",
      repName: "Bow",
      rarity: "Epic",
      clan: "NEN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/WhiteKiller_Epic.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_05_Pre3.png",
      maxPlayCount: 323,
    },
    {
      uniqueId: "983235971287250685025551072688264024413005647533",
      sellerPid: "UFQ2AM8U6V",
      sellerName: "Player202259",
      price: 17500,
      type: 2,
      itemId: 1045,
      itemName: "White killer",
      repName: "Bow",
      rarity: "Epic",
      clan: "NEN",
      serial: 1,
      cloneCount: 0,
      movieUrl:
        "https://battlepalooza-web.s3.amazonaws.com/movieClips/items/WhiteKiller_Epic.mp4",
      thumbnailUrl:
        "https://battlepalooza-web.s3.amazonaws.com/thumbnails/items/Sprite_Shop_Equip_05_Pre3.png",
      maxPlayCount: 323,
    },
  ];

  console.log(pack);

  const handleBuyNCoins = () => {
    setCheckoutNCoin(true);
  };

  const getTransactions = async () => {
    const response = await walletService.getWalletCryptoTransactions(
      userData.bpToken,
      userData.pid
    );
    //Obtenemos todas las transacciones
    const { transactions } = response;

    //En caso que hayan transacciones
    if (transactions?.length) {
      const sortedTx = response?.transactions.sort((a, b) => {
        if (a.created > b.created) return 1;
        if (a.created < b.created) return -1;
        return 0;
      });
      console.log(sortedTx);
      //Obtenemos la última transacción (que es la que debemos ir haciendo poll para consultar el estado)
      const lastTx = sortedTx.pop();
      await fireAlertAsync(
        "Last transaction",
        `Your last transaction id is: ${lastTx?.orderId}`,
        "500px"
      );
      history.push("/open-pack");

      //Si no hay tx devolvemos a Home
    } else {
      await fireAlertAsync("No transactions registered", "", "500px");
      history.push("/");
    }
  };

  const handleBuy = async () => {
    if (Object.keys(userData).length !== 0) {
      try {
        const response = await walletService.getWalletToken(
          userData.bpToken,
          userData.email,
          userData.pid,
          pack?.id
        );
        const canContinue = checkErrorMiddleware(response, history);
        if (canContinue) {
          const { token } = response;
          const popup = window.open(
            `${process.env.REACT_APP_NWAY_URL}token=${token}&${process.env.REACT_APP_NWAY_URL_TITLE}`,
            "Wallet payment",
            "top=50,left= 200,width=800,height=620"
          );

          //Intervalo para detectar el cierre del popup
          const popupTick = setInterval(() => {
            if (popup.closed) {
              console.log("se cerro la window");
              clearInterval(popupTick);
              getTransactions();
            }
          }, 500);
        }
      } catch (error) {
        fireAlert("Oops, an error ocurred", error.message, "500px");
      }
    } else {
      fireToast("Need login", 1200, "300px");
    }
  };

  return (
    <div className={styles.packInfo}>
      <div className={styles.left}>
        <h2 className={styles.title}>{pack?.packName}</h2>
        <p className={styles.desc}>
          {pack?.detailTxt
            ?.toString()
            .split("\\n")
            .map((texto) => (
              <>{texto}</>
            ))}
        </p>

        <h4 className={styles.subtitle}>NFTs you can get</h4>
        <div className={styles.nfts}>
          {nftsTest.map((nft, i) => (
            <NftCard nft={nft} key={i} />
          ))}
        </div>
        <button className={styles.viewAll}>View All</button>
      </div>
      <div className={styles.right}>
        <h2 className={styles.title2}>{pack?.packName}</h2>
        <p className={styles.desc2}>
          {pack?.detailTxt
            ?.toString()
            .split("\\n")
            .map((texto, i) => (
              <>{texto}</>
            ))}
        </p>
        <h4 className={styles.subtitleBuy}>{pack?.price} nCoin</h4>
        <h4 className={styles.subtitleBuy}>Get your first NFTs right away!</h4>
        <span className={styles.descBuy}>
          Welcome to Battlepalooza! Get a [{pack?.packName}] and start
          collecting the NFTs!
        </span>
        <button onClick={handleBuy} className={styles.buy}>
          Buy
        </button>
        <button onClick={handleBuyNCoins} className={styles.buyNcoin}>
          Buy with ncoins
        </button>
      </div>
    </div>
  );
};
