import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedUser } from "../../../redux/userReducer";
import { useHistory, Link, Route, Switch, Redirect } from "react-router-dom";
import styles from './styles.module.css'
import AdminUsers from './AdminUsers'
import AdminOrders from './AdminOrders'
import AdminProducts from './AdminProducts'
import AdminCategorys from "./AdminCategorys";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loggedUser());
  }, []);

  const user = useSelector((state) => state.user);

  if (user.loggedIn === null) {
    return <></>;
  }
  if (user.loggedIn === false || user.roleId === 3) {
    history.push("/");
    return <></>;
  }

  return (
    <>
      <div className={`container ${styles.admin_panel}`}>
				<nav>
				<ul>
					<Link to='/admin/users'><li>Users</li></Link>
					<Link to='/admin/orders'><li>Orders</li></Link>
					<Link to='/admin/products'><li>Products</li></Link>
					<Link to='/admin/categorys'><li>Categorys</li></Link>
				</ul>
				</nav>
					<Switch>
						<Route path="/admin/users" component={AdminUsers} />
						<Route path="/admin/orders" component={AdminOrders} />
						<Route path="/admin/products" component={AdminProducts} />
						<Route path="/admin/categorys" component={AdminCategorys} />
						<Redirect from="/admin" to="/admin/users" />
					</Switch>
			</div>
    </>
  );
};

export default AdminPanel;
