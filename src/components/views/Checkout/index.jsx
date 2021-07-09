import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link, useHistory} from 'react-router-dom'
import axios from  'axios'
import {createCartOrRecover} from '../../../redux/cartReducer'
import CheckItem from './CheckItem'
import styles from "./styles.module.css";

const Checkout = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart.cart);

	const [direction, setDirection] = useState("");

	const handleChangeDirection = (e) => {
		setDirection(e.target.value);
	};

	const handleConfirm = async (e) => {
		let orderId = cart.id;
		e.preventDefault();
		await axios.patch(`/api/cart/${orderId}/pending`,{address: direction})
		dispatch(createCartOrRecover())
		setDirection("");
		history.push("/cart/checkout/success")
	};

	return (
		<section className={styles.checkout}>
			<div className={styles.wrapper}>
				<h1 className={styles.title}>Checkout</h1>
				<hr />
				<h3 className={styles.subtitle}>Entrega</h3>
				<form onSubmit={(e) => {handleConfirm(e)}}>

				<input
					className={styles.input}
					type="text"
					placeholder="Dirección de entrega"
					onChange={(e) => handleChangeDirection(e)}
					value={direction}
					required
				/>
				<ul className={styles.ul}>
				{
					cart.order_details.map((orderDetail, i) => (
						<CheckItem
							index={i + 1}
							price={orderDetail.price}
							quantity={orderDetail.quantity}
							productModel={orderDetail.productModel}
							product={orderDetail.productModel.product}
							orderDetailId={orderDetail.id}
							productModelId={orderDetail.productModel.id}
						/>
					))
				}
				</ul>
				<h4 className={styles.total}>
					Total de la compra:  ${cart.amount}
				</h4>
				<div className={styles.button_container}>
					<button className={styles.button__back}>
						<Link to="/cart">
							Volver
						</Link>
					</button>
					<button
						className={styles.button}
						type="submit"
					>
						Confirmar
					</button>
				</div>
				</form>
			</div>
		</section>
	);
};

export default Checkout;
