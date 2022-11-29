import React, { useState, useContext } from "react";
import { NftData } from "../Context/NftProvider";
import marketService from "../Services/market.service";
import { adaptMarketFilterParams } from "../Utils/objectUtilities";

const useFetchMarket = (filters, filterTypes, page, pageSize) => {
    const { rarityStatic, repIdStatic, premiumStatic, setNftMarket } = useContext(NftData);
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    React.useMemo(async () => {
        if (Object.keys(filters).length && Object.keys(filterTypes).length) {
            try {
                setLoading(true);
                let gotNfts = true;
                let pageVariable = 1;
                const nfts = [];
                do {
                    const staticVars = {
                        rarityStatic,
                        repIdStatic,
                        premiumStatic,
                    };
                    const filterParameters = adaptMarketFilterParams(
                        filters,
                        filterTypes,
                        pageVariable,
                        pageSize,
                        staticVars
                    );
                    const response = await marketService.getNftMarketplaceList(
                        filterParameters.page,
                        filterParameters.pageSize,
                        filterParameters.filter,
                        filterParameters.orderBy,
                        filterParameters.desc
                    );
                    console.log(response);
                    if (response?.products?.length) {
                        nfts.push(...response.products);
                        pageVariable += 1;
                    } else {
                        gotNfts = false;
                    }
                } while (gotNfts === true);
                setNfts(nfts);
                setNftMarket(nfts);
                setLoading(false);
            } catch (error) {
                setError(error.message);
            }
        }
    }, [
        filters,
        filterTypes,
        pageSize,
        rarityStatic,
        repIdStatic,
        premiumStatic,
        setNftMarket,
    ]);

    return [nfts, loading, error];
};

export default useFetchMarket;
