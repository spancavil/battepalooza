import changeDropUrl from '../Utils/changeDropURL';
import { useEffect, useState } from 'react';

const BP_BASE_URL = process.env.REACT_APP_API_BATTLEPALOOZA

const useModifyDropDetailUrl = (dropDetail) => {
    // console.log(dropDetail);

    const [dropDetail2, setDropDetail2] = useState(null)

    useEffect(() => {
        if (dropDetail) {
            console.log(dropDetail);
            const dropDetail2 = {...dropDetail}
            dropDetail2.dropInfo.bigBannerUrl = changeDropUrl(BP_BASE_URL, dropDetail.dropInfo?.bigBannerUrl);
            dropDetail2.dropInfo.mediumBannerUrl = changeDropUrl(BP_BASE_URL, dropDetail.dropInfo?.mediumBannerUrl);
            dropDetail2.dropInfo.smallBannerUrl = changeDropUrl(BP_BASE_URL, dropDetail.dropInfo?.smallBannerUrl);
            setDropDetail2(dropDetail2)
        }
    }, [dropDetail, setDropDetail2])

    return (dropDetail2)
}

export default useModifyDropDetailUrl