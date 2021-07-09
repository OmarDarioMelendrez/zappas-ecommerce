import React from 'react'
import styles from './styles.module.css'
import ListUsers from './ListUsers'
import EditUser from './EditUser'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const AdminUsers = () => {
	return (
		<>
		<nav>
		<ul>
			<li>
				Users
				<FontAwesomeIcon icon={faChevronRight} />
			</li>
			<Link to='/admin/users/list'><li>List All</li></Link>
		</ul>
		</nav>
		<Switch>
			<Route path="/admin/users/list" component={ListUsers} />
			<Route path="/admin/users/edit/:id" component={EditUser} />
			<Redirect from="/admin/users" to="/admin/users/list" />
		</Switch>
		</>
	)
}

export default AdminUsers