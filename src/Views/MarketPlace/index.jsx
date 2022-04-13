import React, { useEffect, useState } from "react";
import Background from "../../Global-Components/Background";
import marketService from "../../Services/market.service";
import Filters from "./components/Filters";
import Products from "./components/Products";
import SearchBar from "./components/SearchBar";
import { logOutAmplitude } from "../../Utils/amplitude";

import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import { TYPE_NFT, NCOIN_BATTLECOUNT, ORDER_BY } from "./Constants";
import { fireAlertAsync } from "../../Utils/sweetAlert2";
import OrderBy from "./components/OrderBy";
import { useMediaQuery } from "../../Hooks/useMediaQuery";

const MarketPlace = () => {
  const [filters, setFilters] = useState({});
  const [orderBy, setOrderBy] = useState({});
  const [page, setPage] = useState(1);
  const [xPage, setxPage] = useState(25);
  const [input, setInput] = useState(1);
  const [maintenance, setMaintenance] = useState(true);
  const [msj, setMsj] = useState(true);

  const desktop = useMediaQuery("(min-width: 1200px)");
  console.log(desktop);
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
          ...NCOIN_BATTLECOUNT,
          search: "",
        });

        setOrderBy({
          ...ORDER_BY,
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
        {maintenance && (
          <span className={styles.maintenance}>
            Blockchain under maintenance. We will be back soon!
          </span>
        )}
        <div className={styles.subContainer}>
          <div className={styles.filtersAndOrder}>
            <Filters
              input={input}
              setInput={setInput}
              setPage={setPage}
              filters={filters}
              setFilters={setFilters}
            />
            {desktop && <OrderBy orderBy={orderBy} setOrderBy={setOrderBy} />}
          </div>
          <div className={styles.products}>
            <SearchBar
              onChange={(value) => setFilters({ ...filters, search: value })}
            />
            <Products
              filters={filters}
              orderBy={orderBy}
              page={page}
              setPage={setPage}
              xPage={xPage}
              setxPage={setxPage}
              input={input}
              setInput={setInput}
            />
          </div>
        </div>
      </div>
      {maintenance && msj && (
        <div className={styles.msj}>
          <span>
            Blockchain under maintenance. <br /> We will be back soon!
          </span>
          <svg
            onClick={() => {
              setMaintenance(false);
              setMsj(false);
            }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="#E5E5E5" />
            <g clip-path="url(#clip0_2538_2187)">
              <rect
                width="1920"
                height="1173"
                transform="translate(-1829 -978)"
                fill="url(#paint0_linear_2538_2187)"
              />
              <g filter="url(#filter0_d_2538_2187)">
                <rect
                  x="-395"
                  y="-28"
                  width="435"
                  height="80"
                  rx="16"
                  fill="#3D91EF"
                />
              </g>
              <path
                d="M18.75 5.25L5.25 18.75"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.75 18.75L5.25 5.25"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_2538_2187"
                x="-411"
                y="-36"
                width="467"
                height="112"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="8" />
                <feGaussianBlur stdDeviation="8" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2538_2187"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2538_2187"
                  result="shape"
                />
              </filter>
              <linearGradient
                id="paint0_linear_2538_2187"
                x1="960"
                y1="-60.4444"
                x2="960"
                y2="1354.33"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#212639" />
                <stop offset="1" stop-color="#000926" />
              </linearGradient>
              <clipPath id="clip0_2538_2187">
                <rect
                  width="1920"
                  height="1173"
                  fill="white"
                  transform="translate(-1829 -978)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      )}
    </Background>
  );
};

export default MarketPlace;
