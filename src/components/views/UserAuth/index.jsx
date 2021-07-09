import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from 'validator';
import {createCartOrRecover} from '../../../redux/cartReducer'
import { registerUser, loginUser, logoutUser, } from "../../../redux/userReducer";
import { Link, useLocation, useHistory } from "react-router-dom";
import {useAlert} from 'react-alert'
import styles from "./styles.module.css";

 
const UserAuth = () => {

  const alert = useAlert();

  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const showLogin = "/login" === useLocation().pathname;
  let history = useHistory()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // isLoggedHook
  // useEffect(() => {
  //   dispatch(loggedUser());
  // }, []);

  const onRegister = (e) => {
    e.preventDefault();
    if(validate()){
    dispatch(registerUser(registerForm));
    history.push("/login")
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(loginForm));
    // await dispatch(createCartOrRecover())
    history.push("/")
  };

  const adminLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(loginUser({email: "admin@admin.com", password: "1234"}));
    history.push("/")
  };

  const onChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const onChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const validateEmail = () => validator.isEmail(registerForm.email)
  const validateName = () => validator.isAlpha(registerForm.firstName) && validator.isAlpha(registerForm.lastName)
  const validatePassword = () => validator.isLength(registerForm.password, 3, 9)
  const validate = () => {

    let isValid = true;

    if(!validateEmail()){
      alert.show("INVALID EMAIL")
      isValid = false;
    }

    if(!validateName()){
      alert.show("INVALID NAME")
      isValid = false;
    }

    if(!validatePassword()){
      alert.show("INVALID PASSWORD")
      isValid = false;
    }

    return isValid
  }


  return (
    <>
        {/* <div className="container login_layout"> */}
        <div className={`container ${styles.login_layout}`}>
          <div id={styles.form_wrapper}>

            <nav>
              <Link to="/login">
              <div className={ showLogin ? styles.active : '' }>
                Login
              </div>
              </Link>
              <Link to="/register">
              <div className={ showLogin ? '' : styles.active }>
                Register
              </div>
              </Link>
            </nav>

            {showLogin ? (
              <form onSubmit={(e)=> onLogin(e)}>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  defaultValue=""
                  onChange={onChangeLogin}
                />
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  defaultValue=""
                  onChange={onChangeLogin}
                />
                <button type="submit">Login</button>
                <button className={styles.button__admin} onClick={(e)=>{adminLogin(e)}}  >Admin Login</button>
              </form>
            ) : (
              <form onSubmit={onRegister}>
                <input
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  onChange={onChangeRegister}
                />
                <input
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  onChange={onChangeRegister}
                />
                <input 
                  placeholder="Email"
                type="email" name="email" onChange={onChangeRegister} />
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={onChangeRegister}
                />
                <button type="submit">Register</button>
              </form>
            )}
          </div>

          {/* <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={logout}>logout</button> */}
        </div>
    </>
  );
};

export default UserAuth;
