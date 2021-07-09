import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, loggedUser } from "../../redux/userReducer"
import { getProducts } from '../../redux/productReducer'
import { createCartOrRecover } from '../../redux/cartReducer'
import { useHistory } from "react-router";
import styles from "./style.module.css";

const Header = () => {
  let [loading, setLoading] = useState(false);
  let [inputValue, setInputValue] = useState("");
  let history = useHistory();

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  // isLoggedHook
  useEffect(async () => {
    await dispatch(loggedUser());
  }, [])

  useEffect(() => {
    if(user.loggedIn) dispatch(createCartOrRecover())
  }, [user.loggedIn])

  const cartItems = useSelector(state => {
    let count = state.cart.cart.order_details?.length
    return count ? count : 0
  })

  const Search = () => {
    setLoading(true);
    dispatch(getProducts(inputValue))
    history.push("/")
    setTimeout(() => setLoading(false), 500);
  };

  const dummyLogin = () => {}

  return (
    <header>

      <Link className={styles.zappas} to='/'>
      <h1>ZAPPAS</h1>
      </Link>

      <form onSubmit={(e)=>{e.preventDefault() ; Search()}} >
        <div className={styles.search}>
          <FontAwesomeIcon
            icon={loading ? faSpinner : faSearch}
            spin={loading}
          />
          <input type="text" palceholder="search..." onChange={(e) => setInputValue(e.target.value)} />
        </div>
      </form>

      <div>
        {user.id ? (
          <span>

            <span className={styles.userInfo}>
              Hi, {user.roleId === 1 || user.roleId === 2 ? <Link to="/admin">{user.firstName}</Link> : user.firstName}!
            </span>

          <Link to="/cart">
          <button>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>{cartItems}</span>
          </button>
          </Link>
          / <Link onClick={()=>dispatch(logoutUser())}>Logout</Link>
          </span>
        ) : (
          <span>
            <Link to="/login">Login</Link>
             / 
            <Link to='/register'>Register</Link>
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
