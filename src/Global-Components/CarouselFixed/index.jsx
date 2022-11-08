import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

const CarouselFixed = ({ containerWidth = 800, children}) => {
    const containerRef = useRef(null)

    const [positionX, setPositionX] = useState({current: 0, mouseDown: 0, mouseMove: 0})
    const [mouseDown, setMouseDown] = useState(false)

    const onMouseDown = (e) => {
        setPositionX({
            ...positionX,
            mouseDown: e.clientX
        })
        setMouseDown(true)
    }

    const onMouseMove = (e) => {
        const deltaX = -(positionX.mouseDown - e.clientX)
        const calculatedPosition = positionX.current + deltaX;
        const widthContainer = 1500
        const widthParentContainer = 800;
        const limitRight = widthContainer - widthParentContainer
        if(calculatedPosition >= -limitRight && calculatedPosition <= 0 && mouseDown) {
            setPositionX({
            ...positionX,
            current: calculatedPosition
            })
        }
    }
    
    const onMouseUp = () => {
        setMouseDown(false)
    }
    
    useEffect(()=> {
        containerRef.current.style.left = `${positionX.current}px` 
    }, [positionX.current])

    return (
        <div
            className={styles.carouselContainer}
            onMouseLeave={()=>setMouseDown(false)}
            style = {{
                width: containerWidth
            }}
            >
            <div
                ref={containerRef}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                className={styles.nftContainer}
            >
                {children}
            </div>
        </div>
    );
};

export default CarouselFixed
