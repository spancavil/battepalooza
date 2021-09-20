import React from 'react';
import {Link} from 'react-router-dom';
import styles from './styles.module.scss';

/**
 * SubMessage
 * @param text Text: Texto que contiene
 * @param link Link: Link a donde dirige
 * @param textLink textLink: Texto donde se usa el Link
 */

const SubMessage = ({text, link, textLink}) => {
  return <span className={styles.message}>{text} <Link to={link}>{textLink}</Link></span>;
};

export default SubMessage;
