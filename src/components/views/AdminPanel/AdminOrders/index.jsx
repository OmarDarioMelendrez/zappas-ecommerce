import React, {useState, useEffect} from "react";
import axios from 'axios';
import styles from "./styles.module.css";
import FormOrder from "./FormOrder";

const AdminOrders = () => {

	const [orders, setOrders] = useState([])
	const [stateChange, setStateChange] = useState(false)

	const handleChangeState = () => {
		setStateChange(true)
	}

	useEffect(() => {
		axios.get("/api/cart").then(response => {
			setOrders(response.data.orders)
		})
		setStateChange(false)
	}, [stateChange])



	return (
		<div className={styles.container}>
			{/* <form>
				<input type="text" placeholder="Search orders for state" />
			</form> */}
			<h2> Ordenes: </h2>
			<ul>
				{orders.map(order => {
					return <FormOrder order={order} user={order.user} onSubmit={handleChangeState}  />

				})}
			</ul>
		</div>
	);
};

export default AdminOrders;
