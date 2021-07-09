import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const EditUser = () => {
  let pen = <FontAwesomeIcon icon={faPen} />;
  let { id } = useParams();
  const [user, setUser] = useState({});
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    axios.get(`/api/user/${id}`).then((res) => {
      setUser(res.data.user);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/user/${id}`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <span>
          <label>
            Name: {user.firstName} <br />
            <input
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
              }}
              type="text"
              placeholder="New name"
              disabled={disabled}
            />
          </label>
        </span>
        <br />
        <span>
          <label>
            Last name: {user.lastName} <br />
            <input
              onChange={(e) => {
                setUser({ ...user, lastName: e.target.value });
              }}
              type="text"
              placeholder="New last name"
              disabled={disabled}
            />
          </label>
        </span>
        <br />
        <span>
          <label>
            Email: {user.email} <br />
            <input
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              type="text"
              placeholder="New email"
              disabled={disabled}
            />
          </label>
        </span>
        <br />
        <span>
          <p>
            Id: {user.id} <br />
          </p>
        </span>

        <button
          onClick={() => {
            setDisabled(!disabled);
          }}
        >
          Edit
          {pen}
        </button>
        {console.log(user.firstName)}

        <span>
          <button type="submit">Save</button>
        </span>
      </form>
    </>
  );
};

export default EditUser;

/* return (
    <ul className={styles.userList}>
      {user.map((user) => (
        <li>
          <p>Name: {user.firstName}</p>
          <p>Email: {user.email}</p>

          <Link to={`/admin/users/edit/${user.id}`}>Edit</Link>
        </li>
      ))}
    </ul>
  ); */
