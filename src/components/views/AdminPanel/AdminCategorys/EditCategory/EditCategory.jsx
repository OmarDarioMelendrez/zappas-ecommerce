import React, {useState} from "react";
import { setCategory } from "../../../../../redux/categoryReducer";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import styles from './styles.module.css'


const EditCategory = () => {
	const [category, setCategorys] = useState("");
 const {id} = useParams()
  const history = useHistory();
  const dispatch = useDispatch();

  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCategory({category, id}));
     history.push("/admin/categorys/list");
  };

  const HandleChange = (e) => {
    const value = e.target.value;
    setCategorys(value);
  };

  return (
    <>
      <h1>Edit Category</h1>
  
      <form className= {styles.editcontainer} onSubmit={(e)=> HandleSubmit(e)}>
        <input className={styles.editinput}
          placeholder="New Name"
          type="text"
          name="name"
          onChange={(e)=>HandleChange(e)}
        />

        <button className= {styles.editbutton}>Send</button>
      </form>
    
    </>
  );
};

export default EditCategory;
