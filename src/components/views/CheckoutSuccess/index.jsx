import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

import styles from './styles.module.css';

const CheckoutSuccess = () => {
    return (
		<section className={styles.container}>
			<div className={styles.wrapper}>
             <h2>Compra realizada con éxito</h2>
             <FontAwesomeIcon className={styles.success__icon} icon={faCheckCircle} />
                <button className={styles.button}>
                    <Link to="/">
                    Seguir comprando
                    </Link>
                </button>
            </div>
        </section>
    )
}

export default CheckoutSuccess
