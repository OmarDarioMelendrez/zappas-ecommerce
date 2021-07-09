import React from "react";
import styles from "./styles.module.css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import ListProducts from "./ListProducts";
import CreateProducts from "./CreateProduct";
import EditProduct from "./EditProduct";

const AdminProducts = () => {

  return (
    <>
      <nav>
        <ul>
          <li>
            Products
            <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <Link to="/admin/products/list">
            <li>All products</li>
          </Link>
          <Link to="/admin/products/create">
            <li>Create +</li>
          </Link>
        </ul>
      </nav>
      <Switch>
        <Route path="/admin/products/list" component={ListProducts}/>
        <Route path="/admin/products/create" component={CreateProducts}/>
        <Route path="/admin/products/edit/:id" component={EditProduct}/>
        <Redirect from="/admin/products" to="/admin/products/list" />
      </Switch>
    </>
  );
};

export default AdminProducts;
