import React from 'react'
import ArrowPagination from '../../../../Assets/svg/ArrowPagination';
import styles from './styles.module.scss';

const Arrow = ({onClick, previous = false, initial=false, last=false}) => {
    return (
        <div 
            onClick={onClick} 
            className ={ initial 
                ? styles.arrowContainerInitial
                : last
                ? styles.arrowContainerLast
                : styles.arrowContainer}
        >
            <ArrowPagination className={previous ? styles.leftArrow : null} />
        </div>
    )
}

export default Arrow

