export const mapPremiumParams = (premiumBuffArrayName, premiumArray) => {
    let premiumIds = []
    for (const buffName of premiumBuffArrayName) {
        premiumIds.push(
            ...premiumArray
                .filter(buff => buff.engName === buffName)
                .map(buff => buff.id)
        )
    }
    return premiumIds.length ? premiumIds : null;
}

export const mapRaritiesParams = (raritiesFilter, raritiesStatic) => {
    let rarities = []
    for (const rarity in raritiesFilter) {
        const checked = raritiesFilter[rarity];
        if (checked) {
            const id = raritiesStatic.find(staticRarity => staticRarity.name === rarity).rarityType
            if (id) rarities.push(id)
        }
    }
    return rarities;
}

export const mapRepresantiveIdParams = (repIdFilter, repIdStatic) => {
    let repIdArray = []
    for (const repId in repIdFilter) {
        const checked = repIdFilter[repId];
        if (checked) {
            const element = repIdStatic.find(repIdEstatico => repIdEstatico.name === repId)
            repIdArray.push({
                type: element.goodsType,
                id: element.representId
            })
        }
    }
    return repIdArray
}