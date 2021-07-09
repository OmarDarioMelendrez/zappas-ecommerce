import React, { useState } from "react";
import styles from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Card = ({ product }) => {

  const [favorite, setFavorite] = useState(false);
  const heart = <FontAwesomeIcon icon={favorite ? faHeartSolid : faHeart} />;

  return (
    <>
      <div className={styles.card}>
        <Link to={`/product/${product.id}`}>
          <img
            src={product.productModels[0].images[0]}
            alt={product.name}
          />
          <hr />
        </Link>
        <div className={styles.cardInfo}>
          <Link to={`/product/${product.id}`}>
            <h2>{`$ ${product.productModels[0].price}`}</h2>
            <p>{product.name}</p>
          </Link>
          <span onClick={() => setFavorite(!favorite)}>{heart}</span>
        </div>
      </div>
    </>
  );
};

export default Card;
