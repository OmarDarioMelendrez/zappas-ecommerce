import React, { useState } from 'react'
import styles from "./styles.module.css"
import {useDispatch} from 'react-redux'
import {addProductToCart} from '../../redux/cartReducer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

const BuyForm = ({ productDetail, selectModel, model }) => {
  const dispatch = useDispatch();
  let [success, setSuccess] = useState(false)

  const buy = (e, modelId) => {
    e.preventDefault();
    dispatch(addProductToCart(modelId))
    setSuccess(true)
  }
  
  return (
    <div className={styles.form}>
      <form>
        <h3>{model.price} $</h3>

        <div>
          <select id="model" onChange={(e) => selectModel(e.target.value)}>
            {productDetail.productModels.map((model, i) => (
              <option key={i} value={i}>
                {model.color}
              </option>
            ))}
          </select>
        </div>

        <select id="size">
          <option>size 36</option>
          <option disabled>size 37</option>
          <option disabled>size 38</option>
          <option>size 39</option>
          <option>size 40</option>
          <option disabled>size 41</option>
          <option>size 42</option>
          <option>size 43</option>
        </select>

        <p>{productDetail.description}</p>

        <button className={success ? styles.success : ''} onClick={(e)=>buy(e, model.id)}>
          {success ? <FontAwesomeIcon icon={faCheckCircle} /> : 'ADD TO CART'}
        </button>
      </form>
    </div>
  );
};

export default BuyForm;