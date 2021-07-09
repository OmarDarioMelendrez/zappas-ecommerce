import React, { useEffect, useState} from "react";
import Main from "./components/views/Main";
import UserOrders from "./components/views/UserOrders";
import MyCart from "./components/views/MyCart";
import Checkout from "./components/views/Checkout";
import CheckoutSuccess from "./components/views/CheckoutSuccess";
import SingleProduct from "./components/views/SingleProduct";
import { Switch, Route, Redirect } from "react-router-dom";
import UserAuth from "./components/views/UserAuth";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/productReducer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminPanel from "./components/views/AdminPanel";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(""));
  }, []);

  return (
    <div className="wrapper"> 
    <Header />
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/orders" component={UserOrders} />
      <Route exact path="/cart" component={MyCart} />
      <Route exact path="/cart/checkout" component={Checkout} />
      <Route exact path="/cart/checkout/success" component={CheckoutSuccess} />
      <Route path="/product/:id" component={SingleProduct} />
      {/* <Route path="/product/:id/reviews"/> {Esta ruta no se si existiria o las reviews serian parte del product/:id} */}
      <Route path="/register" component={UserAuth} />
      <Route path="/login" component={UserAuth} />
      <Route path="/users" />
      <Route path="/users/:id" />
      <Route path="/admin" component={AdminPanel} />
      <Redirect from="*" to="/" />
    </Switch>
    <Footer/>
    </div>
  );
};

export default App;
