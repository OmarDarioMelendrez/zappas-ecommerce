import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import styles from "./style.module.css";

const MyCart = () => {
	const cart = useSelector((state) => state.cart.cart);

	return (
		<>
			<div className={styles.cart_tabs}>
				<div className={styles.cart__wrapper}>
				{cart.order_details && cart.order_details.map((orderDetail) => (
					<CartItem
						price={orderDetail.price}
						quantity={orderDetail.quantity}
						productModel={orderDetail.productModel}
						product={orderDetail.productModel.product}
						orderDetailId={orderDetail.id}
						productModelId={orderDetail.productModel.id}
					/>
				))}
				<div className={styles.empty_cart}>
					<h3>Total: {cart.amount}</h3>
					{/* <p>Podes buscar en los productos que te interesaron!</p> */}
				</div>

			<div className={styles.button_container}>
				<button className={styles.button}>
					<Link to="/cart/checkout">Comprar</Link>
				</button>
			</div>
			</div>
			</div>

		</>
	);
};

export default MyCart;
