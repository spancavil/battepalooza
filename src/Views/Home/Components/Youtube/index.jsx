import React from 'react';
import { useMediaQuery } from '../../../../Hooks/useMediaQuery';
import styles from './styles.module.scss';

const YoutubeEmbed = ({ embedId, onExit }) => {

    const mobile = "576px";
    const desktop = "1400px";

    const Queries = {
        mobileQuery: `(max-width: 575px)`,
        desktopQuery: `(min-width:${mobile}) and (max-width:1399px)`,
        HDQuery: `(min-width: ${desktop})`
    }

    let sizeHeight;
    let sizeWidth;

    if (useMediaQuery(Queries.HDQuery)) {
        sizeHeight = '720';
        sizeWidth = '1280';
    }

    if (useMediaQuery(Queries.desktopQuery)) {
        sizeHeight = '480';
        sizeWidth = '854';
    }

    if (useMediaQuery(Queries.mobileQuery)) {
        sizeHeight = '360';
        sizeWidth = '640';
    }

    console.log(sizeHeight);
    console.log(sizeWidth);

    const handleExit = (e) => {
        e.code === "Escape" && onExit()
    }

    return (
        <div
            onKeyUpCapture={e => handleExit(e)}
            tabIndex={0}
            className = {styles.videoResponsive}
        >
            <iframe
                onKeyUpCapture={e => handleExit(e)}
                width={sizeWidth}
                height={sizeHeight}
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>)
};

export default YoutubeEmbed;