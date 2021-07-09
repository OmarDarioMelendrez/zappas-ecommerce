import React from 'react'
import styles from './styles.module.css'
import ListCategorys from "./ListCategory/ListCategory"
import CreateCategory from "./CreateCategory/CreateCategory"
import EditCategory from "./EditCategory/EditCategory"
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const AdminCategorys = () => {
	return (
		<>
		<nav>
		<ul>
			<li>
				Categorys
				<FontAwesomeIcon icon={faChevronRight} />
			</li>
			<Link to='/admin/categorys/list'><li>List All</li></Link>
			<Link to='/admin/categorys/create'><li>Create +</li></Link>
		</ul>
		</nav>
		<Switch>
			<Route path="/admin/categorys/list" component={ListCategorys} />
			<Route path="/admin/categorys/create" component={CreateCategory} />
			<Route path="/admin/categorys/edit/:id" component={EditCategory} />
			<Redirect from="/admin/categorys" to="/admin/categorys/list" />
		</Switch>
		</>
	)
}

export default AdminCategorys