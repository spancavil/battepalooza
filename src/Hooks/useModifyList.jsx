import { useEffect, useState } from 'react';

const useModifyList = (nftsToModify, nftStatic, clanStatic, rarityStatic, repIdStatic) => {

    const [nftsModified, setNftsModified] = useState([]);

    useEffect(() => {
        if (nftsToModify?.length !== 0 && nftStatic?.length !== 0 && clanStatic?.length !== 0 && rarityStatic?.length !== 0 && repIdStatic?.length !== 0) {
            for (const nft of nftsToModify) {
                const nftFinded = nftStatic.find(element => element.id === (nft.itemId || nft.id));
                if (nftFinded) {
                    const clanFinded = clanStatic.find(clan => clan.clan === nftFinded.clan);
                    const rarityFinded = rarityStatic.find(rarity => rarity.rarityType === nftFinded.rarityType)
                    const representName = repIdStatic.find(repId => repId.representId === nftFinded.representId)
                    nft.portrait = nftFinded.portrait
                    nft.itemName = nftFinded.engName
                    nft.repName = representName?.name || nft.repName
                    nft.clan = clanFinded?.name || "No clan"
                    nft.rarity = rarityFinded.name
                    nft.movieUrl = nftFinded.movieClip
                    nft.thumbnailUrl = nftFinded.thumbnail
                    nft.engStory = nftFinded.engStory
                } else {
                    console.log("Nft not found in list:")
                    console.log(nft);
                }
            }
            
            setNftsModified(nftsToModify)
        }

        if (nftsToModify.length === 0) {
            setNftsModified([])
        }
    }, [nftStatic, clanStatic, rarityStatic, repIdStatic, nftsToModify])

    return nftsModified
}

export default useModifyList;