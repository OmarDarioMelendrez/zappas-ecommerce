import React, { useState } from "react";
import { createCategory } from "../../../../../redux/categoryReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styles from './styles.module.css'

const CreateCategory = () => {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory(category));
    setCategory("")
     history.push("/admin/categorys/list");
  };

  const HandleChange = (e) => {
    const value = e.target.value;
    setCategory(value);
  };

  return (
    <>
      <h1>Create Category</h1>
      <form className= {styles.createcontainer} onSubmit={(e)=> HandleSubmit(e)}>
        <input className={styles.createinput}
          placeholder="Name"
          type="text"
          name="name"
          onChange={(e)=> HandleChange(e)}
        />

        <button className= {styles.createbutton}>Send</button>
      </form>
    </>
  );
};

export default CreateCategory;
