import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Background from "../../Global-Components/Background";
import marketService from "../../Services/market.service";
import { logOutAmplitude } from "../../Utils/amplitude";
import { fireAlertAsync } from "../../Utils/sweetAlert2";
import Filters from "../MarketPlace/components/Filters";
import { CLONE_COUNT, TYPE_NFT } from "../MarketPlace/Constants";
import CollectionNfts from "./Components/CollectionNfts";
import styles from "./styles.module.scss";

const Collection = () => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [xPage, setxPage] = useState(25);
  const [input, setInput] = useState(1);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const response = await marketService.getData();
        if (response.error.text !== "") {
          if (response.error.text.includes("authorized")) {
            fireAlertAsync(
              "Warning",
              "Session expired, please login again."
            ).then(() => {
              localStorage.removeItem("userBP");
              logOutAmplitude();
              history.push("/");
              window.location.reload();
            });
          } else {
            fireAlertAsync(response.error?.text).then(() => {
              history.push("/");
            });
          }
        }

        let rarityItem = {};
        response.rarityList.forEach((rarity) => {
          Object.defineProperty(rarityItem, rarity.name, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: false,
          });
        });
        //Tendrá todos los filtros
        setFilters({
          ...rarityItem,
          ...TYPE_NFT,
          ...CLONE_COUNT,
        });
      } catch (error) {
        fireAlertAsync("Error: ", error.message);
        return;
      }
    })();
  }, [setFilters, history]);

  return (
    <Background>
      <div className={styles.container}>
        <Filters
          input={input}
          setInput={setInput}
          setPage={setPage}
          filters={filters}
          setFilters={setFilters}
        />
        <div className={styles.nfts}>
          <CollectionNfts
            filters={filters}
            page={page}
            setPage={setPage}
            xPage={xPage}
            setxPage={setxPage}
            input={input}
            setInput={setInput}
          />
        </div>
      </div>
    </Background>
  );
};

export default Collection;
