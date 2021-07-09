import React from 'react'
import styles from './styles.module.css';

const CheckItem = ({price,quantity,product, index}) => {
    return (
        <li className={styles.list}>
            <span className={styles.check__name}>
               {`${index} )`} {product.name}
            </span>
            <div className={styles.check__info}>
                <span className={styles.check__quantity}> cantidad: {quantity}</span>
                <span className={styles.check__price}>$ {price}</span>
            </div>
        </li>
    )
}

export default CheckItem
