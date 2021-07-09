import React from "react";
import { useDispatch } from "react-redux";
import {
	incrementeProduct,
	decrementProduct,
	deleteProductOfCart,
} from "../../../../redux/cartReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import styles from "./styles.module.css";

const CartItem = ({
	price,
	quantity,
	productModel,
	product,
	orderDetailId,
	productModelId,
}) => {
	const dispatch = useDispatch();

	return (
		<div className={styles.cartItem}>
			<div className={styles.img}>
				<img
					src={productModel.images[0]}
					alt="product"
				/>
			</div>
			<div className={styles.product__data}>
				<div className={styles.product}>{product.name}</div>
				<div className={styles.model}>{product.description}</div>
			</div>
			<div className={styles.quantity}>
				<div className={styles.quantity__container}>
					<button
						onClick={() =>
							dispatch(
								decrementProduct({
									orderDetailId,
									productModelId,
								})
							)
						}
					>
						-
					</button>
					<span>{quantity}</span>
					<button
						onClick={() =>
							dispatch(
								incrementeProduct({
									orderDetailId,
									productModelId,
								})
							)
						}
					>
						+
					</button>
				</div>
			</div>
			<div className={styles.price}>
				<span>$ {price}</span>
				<span
					className={styles.trash}
					onClick={() => dispatch(deleteProductOfCart(orderDetailId))}
				>
					<FontAwesomeIcon icon={faTrashAlt} />
				</span>
			</div>
		</div>
	);
};

export default CartItem;
