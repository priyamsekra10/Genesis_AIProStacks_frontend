import React from 'react';

import Icon from '../Icons/Icon';
import * as styles from './AdjustItem.module.css';

const MAX_QUANTITY = 7;

const AdjustItem = ({ qty, setQty, isTransparent }) => {

  const handleOnChange = (e) => {
    const num = parseInt(e.target.value, 10);
    if (num >= 0 && num <= MAX_QUANTITY) {
      setQty(num);
    } else if (num > MAX_QUANTITY) {
      setQty(MAX_QUANTITY);
    }
    // No action if num is less than 0, as quantity cannot be negative
  };

  return (
    <div className={`${styles.root} ${isTransparent ? styles.transparent : ''}`}>
      <div className={styles.iconContainer} role={'presentation'} onClick={() => {
        if (qty > 1) {
          setQty(qty - 1);
        }
      }}>
        <Icon symbol={'minus'}></Icon>
      </div>
      <div className={styles.inputContainer}>
        <input className={`${isTransparent ? styles.transparentInput : ''}`} 
               onChange={handleOnChange} 
               type={'number'} 
               value={qty} />
      </div>
      <div role={'presentation'} onClick={() => {
        if (qty < MAX_QUANTITY) {
          setQty(qty + 1);
        }
      }} className={styles.iconContainer}>
        <Icon symbol={'plus'}></Icon>
      </div>
    </div>
  );
};

export default AdjustItem;
