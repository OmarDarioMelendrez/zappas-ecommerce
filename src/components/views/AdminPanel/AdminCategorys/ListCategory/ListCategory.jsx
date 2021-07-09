import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategorys,
  deleteCategory,
} from "../../../../../redux/categoryReducer";

const ListCategorys = () => {
  const categorys = useSelector((state) => state.categorys.results);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  return (
    <div>
      <h1>All Categorys</h1>
      <ul className={styles.categoryList}>
        {categorys.length > 0 &&
          categorys.map((category) => (
            <li>
              <span clasname={styles.span}> Category: {category.name}</span>
              <div>
              <button onClick={() => dispatch(deleteCategory(category.id))}>
                Delete
              </button>
              <button>
                <Link to={`/admin/categorys/edit/${category.id}`}>Edit</Link>
              </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListCategorys;
