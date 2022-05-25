import { useState, useEffect } from 'react'

const useModifyDetail = (nftDetailtoModify, nftStatic, clanStatic, rarityStatic, repIdStatic, premiumStatic) => {

    const [nftDetailModified, setNftDetailModified] = useState([])
    useEffect(() => {
        if (nftDetailtoModify && nftDetailtoModify?.length !== 0 && nftStatic.length !== 0 && clanStatic.length !== 0 && rarityStatic.length !== 0 && repIdStatic.length !== 0 && premiumStatic.length !== 0) {
            const nftFinded = nftStatic.find(element => element.id === nftDetailtoModify.itemId);
            if (nftFinded) {
                const clanFinded = clanStatic.find(clan => clan.clan === nftFinded.clan);
                const rarityFinded = rarityStatic.find(rarity => rarity.rarityType === nftFinded.rarityType)
                const representName = repIdStatic.find(repId => repId.representId === nftFinded.representId)
                const buffFinded = premiumStatic?.find(buff => buff.id === nftDetailtoModify.buff[0].id)
               
                nftDetailtoModify.itemName = nftFinded.engName
                nftDetailtoModify.storyText = nftFinded.engStory
                nftDetailtoModify.movieUrl = nftFinded.movieClip
                nftDetailtoModify.thumbnailUrl = nftFinded.thumbnail
                nftDetailtoModify.repName = representName?.name || nftDetailtoModify.repName
                nftDetailtoModify.clan = clanFinded?.name || "No clan"
                nftDetailtoModify.rarity = rarityFinded.name
                nftDetailtoModify.rewardMultiplier = rarityFinded.nftGRTRewardMultiplier
                nftDetailtoModify.maxPlayCount = rarityFinded.totalMaxPlayRewardCount
                nftDetailtoModify.maxDailyPlayCount = rarityFinded.dailyMaxPlayRewardCount || 12
                nftDetailtoModify.maxCloneCount = rarityFinded.maxCloneCount || 1
                nftDetailtoModify.premiumBuff = buffFinded
            }
            setNftDetailModified(nftDetailtoModify)
        }
    }, [nftStatic, clanStatic, rarityStatic, repIdStatic, nftDetailtoModify, premiumStatic])

    return (
        { ...nftDetailModified }
    )
}

export default useModifyDetail