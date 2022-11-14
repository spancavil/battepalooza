import React from 'react'
import ArrowPagination from '../../../../Assets/svg/ArrowPagination';
import { useMediaQuery } from '../../../../Hooks/useMediaQuery';
import styles from './styles.module.scss';

const Arrow = ({onClick, previous = false}) => {
    const tablet = useMediaQuery("(max-width: 768px)");
    const hd = useMediaQuery("(min-width: 1400px)")
    return (
        <div 
            onClick={onClick} 
            className ={styles.arrowContainer}
            style = { previous
                ? {transform: "rotate(180deg)", position: 'fixed', left: tablet ? '5%' : hd ? '20%' : '12%', top: '50%'}
                : {position: 'fixed', right: tablet ? '5%' : hd ? '20%' : '12%', top: '50%'}
            }
        >
            <ArrowPagination/>
        </div>
    )
}

export default Arrow

