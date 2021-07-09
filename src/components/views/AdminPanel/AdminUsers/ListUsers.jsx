import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../../../../redux/userReducer";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [change, setChange] = useState(true);
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    axios.get("/api/user/").then((res) => {
      setUsers(res.data.users);
      setChange(true)
    });
  }, [change]);

  const handleDelete = (userId) => {
    axios.delete(`/api/user/${userId}`).then((res) => {
      axios.get("/api/user/").then((res) => {
        setUsers(res.data.users);
      });
    });
  };
  
  const handleSetAdmin = (userId) => {
    dispatch(setAdmin(userId))
    setChange(false)
  }
  
  return (
    <ul className={styles.userList}>
      {users.map((user) => (
        <li key={user.id}>
          {console.log(user)}
          <p>Name: {user.firstName}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role.role}</p>

          <button
            onClick={() => {
              handleDelete(user.id);
            }}
          >
            Delete
          </button>
          <Link to={`/admin/users/edit/${user.id}`}>Edit</Link>
          <button onClick={() => {handleSetAdmin(user.id)}}>Set Admin</button>
        </li>
      ))}
    </ul>
  );
};

export default ListUsers;
