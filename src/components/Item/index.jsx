import React from "react";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from "../../redux/productReducer";
import { useDispatch, useSelector } from "react-redux";


const Item = ({product}) => {

  
  const dispatch = useDispatch();
  let id = product.id

  if(product.productModels[0] === undefined) return <h1>EEEEEE</h1>

  const onClickDelete = (e) => {
    e.preventDefault();
    console.log("ENTRO ACA CON ID:", id)
    dispatch(deleteProduct(id))
  }

  const trash = <FontAwesomeIcon icon={faTrashAlt} />
  const edit = <FontAwesomeIcon icon={faEdit} />
  return (
    <>
      <div className={styles.item}>
        <div className={styles.item_img}>
          <img
            src={product.productModels[0].images[0]}
            alt={product.name}
          />
        </div>
        <div className={styles.item_price}>
          <h3>{`$ ${product.productModels[0].price}`}</h3>
        </div>
        <div className={styles.item_info}>
          <div className={styles.item_name}>
            <h2>
              {product.brand} {product.name}
            </h2>
          </div>
          <div className={styles.item_description}>{product.description}</div>
        </div>
        <div className={styles.item_delete}>
          <button onClick={onClickDelete}>{trash}</button>  
          <Link to={'/admin/products/edit/'+product.id}>
          <button>{edit}</button>
          </Link>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Item;
