import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Sidebar from "../../Sidebar";
import Footer from "../../Footer";
import styles from "./styles.module.css";

const UserOrders = () => {
	const user = useSelector((state) => state.user);

	console.log(user.id);

	const [userOrders, setUserOrders] = useState([]);

	useEffect(() => {
		if (user){
			axios.get("/api/cart/orders", { userId: user.id }).then((response) => {
				setUserOrders(response.data.orders);
			});
		}
	}, [user.id]);

	return (
		<>
			<div className={`container ${styles.main_layout}`}>
				<Sidebar />
				<div className={styles.orders}>
					<h2>Mis compras: </h2>
					<div className={styles.orders__table}>
						<div className={`${styles.order__header}`}>
							<div className={styles.order__title}>Orden</div>
							<div className={styles.order__title}>Usuario</div>
							<div className={styles.order__title}>Estado</div>
							<div className={styles.order__title}>Total</div>
						</div>
						{
							userOrders.map(order => (
							<div className={styles.order__row}>
								<div className={styles.order__item}>{order.id}</div>
								<div className={styles.order__item}>
									{order.user.firstName}
								</div>
								<div className={styles.order__item}>
									{order.state}
								</div>
								<div className={styles.order__item}>{order.amount}</div>
							</div>
							))
						}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserOrders;
