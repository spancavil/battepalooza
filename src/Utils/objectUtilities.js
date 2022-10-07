import { mapPremiumParams, mapRaritiesParams, mapRepresantiveIdParams } from "./mapParams";

export const sliceObject = (objetoARecortar, valor1 = 0, valor2 = -1) => {
    const sliced = Object.keys(objetoARecortar)
        .slice(valor1, valor2)
        .reduce((result, key) => {
            result[key] = objetoARecortar;
            return result;
        }, {});
    return sliced;
};

export const filterObject = (objetoRaw, keysPermitidas) => {

    const arrayKeysPermitidas = Object.keys(keysPermitidas);
    const filtered = Object.keys(objetoRaw)
        .filter((key) => arrayKeysPermitidas.includes(key))
        .reduce((objetoAcumulado, keyActual) => {
            objetoAcumulado[keyActual] = objetoRaw[keyActual];
            return objetoAcumulado;
        }, {});

    return filtered;
};

export const makeCheckableObject = (keysArray) => {
    let object = {}
    keysArray.forEach((key) => {
        Object.defineProperty(object, key.name, {
          configurable: true,
          enumerable: true,
          writable: true,
          value: false,
        });
      });
    return object;
}

export const adaptMarketFilterParams = (filters, filterTypes, page, pageSize, staticVars) => {

    //FILTER MODEL
    /* {
        "page": 1,
        "pageSize": 25,
        "orderBy": "price",
        "filter": {
            "itemType": null,
            "rarity": null,
            "remainPlayCount":null,
            "repId": null,
            "buff": null
        },
        "desc": true
    } */
    const {rarityStatic, repIdStatic, premiumStatic} = staticVars;

    //Order by params
    const orderBy = filterObject(filters, filterTypes.orderBy)
    let orderByParam = ""
    let orderByDesc = false

    if (orderBy.Newest) {
        orderByParam = 'created'
        orderByDesc = true
    }
    else if (orderBy.Oldest) {
        orderByParam = 'created'
        orderByDesc = false
    }
    else if (orderBy.LowestPrice) {
        orderByParam = 'price'
        orderByDesc = false
    }
    else if (orderBy.HighestPrice) {
        orderByParam = 'price'
        orderByDesc = true
    }
    else {
        orderByParam = 'created'
        orderByDesc = true
    }
    
    //Premium buffs
    const premiumBuffs = filterObject(filters, filterTypes.premiumBuffs)
    let buffNames = [];
    for (const key in premiumBuffs) {
        if (premiumBuffs[key]) buffNames.push(key);
    }
    const arrayBuffs = mapPremiumParams(buffNames, premiumStatic)

    let itemType = []

    //Weapon or character
    if (filters.Character) {
        itemType.push(1)
    }
    if (filters.Weapon) {
        itemType.push(2)
    }

    //Rarities
    const raritiesFilters = filterObject(filters, filterTypes.rarities)
    let raritiesParam = mapRaritiesParams(raritiesFilters, rarityStatic)

    //Remain play count
    const remainPlayCountFilter = filterObject(filters, filterTypes.p2e);
    let playCountParam = []

    if(remainPlayCountFilter["0-50"]) {
        playCountParam.push ({
            min: 0,
            max: 50
        })
    }

    if(remainPlayCountFilter["51-100"]){
        playCountParam.push ({
            min: 51,
            max: 100
        })
    }

    if(remainPlayCountFilter["Over 101"]){
        playCountParam.push ({
            min: 101,
            max: 0 //0 is infinity
        })
    }

    //repId 
    const filterTypesWeaponsAndChars = {...filterTypes.weapons, ...filterTypes.characters}
    const repIdFilters = filterObject(filters, filterTypesWeaponsAndChars);
    const repIdParams = mapRepresantiveIdParams(repIdFilters, repIdStatic);

    const parameters = {
        page,
        pageSize,
        orderBy: orderByParam,
        desc: orderByDesc,
        filter: {
            buff: arrayBuffs,
            itemType: itemType.length ? itemType : null,
            rarity: raritiesParam.length ? raritiesParam : null,
            remainPlayCount: playCountParam.length ? playCountParam : null,
            repId: repIdParams.length ? repIdParams: null
        }
    }

    return parameters
}