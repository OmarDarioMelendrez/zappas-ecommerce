import React from 'react';
import styles from './styles.module.css'
import { useParams } from 'react-router';
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from 'react-redux';



const CardReview = ({review}) => {
    
    const productDetail = useSelector((state) => state.products.productDetail);

    const rating = review.raiting;

    const stars = Array(5)
    .fill(0)
    .map((v, i) => (
        <FontAwesomeIcon key={i} icon={i < rating ? faStarSolid : faStar} />
    ));

    return (
        <>
            <div className={styles.cardReviews}>
                <h2>{productDetail.brand} {productDetail.name}<span>{stars}</span></h2>
                <p>{review.description}</p>
            </div>
        </>
    )
}

export default CardReview;



