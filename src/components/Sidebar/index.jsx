import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./style.module.css";
import { getCategorys } from "../../redux/categoryReducer";
import { getCategory } from "../../redux/productReducer";

const Sidebar = () => {
  const history = useHistory();
	const user = useSelector((state) => state.user);
	const categories = useSelector((state) => state.categorys.results);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategorys());
	}, [dispatch]);

  const Search = (category) => {
    dispatch(getCategory(category))
    history.push("/")
  };

	return (
		<div className={styles.sidebar}>
			{user.id && (
				<div className={styles.searchFilterContainer}>
					<span className={styles.searchFilterTitle}>
						<h4>Mis ordenes:</h4>
					</span>
					<span className={`${styles.searchFilterName} ${styles.dd}`}>
						<Link to="/orders">Ordenes</Link>
					</span>
				</div>
			)}

			<div className={styles.searchFilterContainer}>
				<span className={styles.searchFilterTitle}>
					<h4>Categorias:</h4>
				</span>
				<span className={`${styles.searchFilterName} ${styles.dd}`}>
					<ul className={styles.ul}>
						{categories &&
							categories.map((category) => (
								<li
									className={`${styles.searchFilterName} ${styles.dd}`}
                  onClick={()=>{Search(category.name)}}
								>
									{category.name}
								</li>
							))}
					</ul>
				</span>
			</div>

			{/* <div className={styles.searchFilterContainer}>
        <span className={`${styles.searchFilterName} ${styles.dd} ${styles.tag}`}>
          aca! <span>x</span>
        </span>
        <span className={`${styles.searchFilterName} ${styles.dd} ${styles.tag}`}>
          aca! <span>x</span>
        </span>
        <span className={`${styles.searchFilterName} ${styles.dd} ${styles.tag}`}>
          aca! <span>x</span>
        </span>
        <span className={`${styles.searchFilterName} ${styles.dd} ${styles.tag}`}>
          aca! <span>x</span>
        </span>
      </div>
      <div className={styles.searchFilterContainer}>
        <span className={styles.searchFilterTitle}>
          <h4>Genero</h4>
        </span>
        <span className={${styles.searchFilterName} styles.dd}>Hombre</span>
        <span className={${styles.searchFilterName} styles.dd}>Mujer</span>
        <span className={${styles.searchFilterName} styles.dd}>Ninos</span>
        <span className={${styles.searchFilterName} styles.dd}>Ninas</span>
        <span className={${styles.searchFilterName} styles.dd}>Bebes</span>
      </div>
      <div className={styles.searchFilterContainer}>
        <span className={styles.searchFilterTitle}>
          <h4>Marca</h4>
        </span>
        <span className={${styles.searchFilterName} styles.dd}>Adidas</span>
        <span className={${styles.searchFilterName} styles.dd}>Nike</span>
        <span className={${styles.searchFilterName} styles.dd}>Asics</span>
        <span className={${styles.searchFilterName} styles.dd}>Lacoste</span>
        <span className={${styles.searchFilterName} styles.dd}>Jordan</span>
        <span className={${styles.searchFilterName} styles.dd}>Converse</span>
        <span className={${styles.searchFilterName} styles.dd}>Puma</span>
        <span className={${styles.searchFilterName} styles.dd}>Polo</span>
        <span className={${styles.searchFilterName} styles.dd}>Mistral</span>
      </div>
      <div className={styles.searchFilterContainer}>
        <span className={styles.searchFilterTitle}>
          <h4>Deporte</h4>
        </span>
        <span className={${styles.searchFilterName} styles.dd}>Running</span>
        <span className={${styles.searchFilterName} styles.dd}>Futbol</span>
        <span className={${styles.searchFilterName} styles.dd}>Basquet</span>
        <span className={${styles.searchFilterName} styles.dd}>Training</span>
        <span className={${styles.searchFilterName} styles.dd}>Tenis</span>
      </div>
      <div className={styles.searchFilterContainer}>
        <span className={styles.searchFilterTitle}>
          <h4>Material</h4>
        </span>
        <span className={${styles.searchFilterName} styles.dd}>Tela</span>
        <span className={${styles.searchFilterName} styles.dd}>Gamuza</span>
        <span className={${styles.searchFilterName} styles.dd}>Cuero</span>
        <span className={${styles.searchFilterName} styles.dd}>Cuero Sintentico</span>
      </div>
      <div className={styles.searchFilterContainer}>
        <span className={styles.searchFilterTitle}>
          <h4>Talle</h4>
        </span>

        <span className={${styles.searchFilterName} styles.dd}>35</span>
        <span className={${styles.searchFilterName} styles.dd}>36.5</span>
        <span className={${styles.searchFilterName} styles.dd}>38</span>
        <span className={${styles.searchFilterName} styles.dd}>40</span>
        <span className={${styles.searchFilterName} styles.dd}>41.5</span>
        <span className={${styles.searchFilterName} styles.dd}>43</span>
        <span className={${styles.searchFilterName} styles.dd}>45</span>
      </div>
      <div className={styles.searchFilterContainer}>
        <span className={styles.searchFilterTitle}>
          <h4>Color</h4>
        </span>

        <span className={${styles.searchFilterName} styles.dd}>Blanco</span>
        <span className={${styles.searchFilterName} styles.dd}>Negro</span>
        <span className={${styles.searchFilterName} styles.dd}>Rojo</span>
        <span className={${styles.searchFilterName} styles.dd}>Gris</span>
        <span className={${styles.searchFilterName} styles.dd}>Gris oscuro</span>
        <span className={${styles.searchFilterName} styles.dd}>Azul oscuro</span>
      </div>
      <div className={styles.searchFilterContainer}>
        <span className={styles.searchFilterTitle}>
          <h4>Precio</h4>
        </span>

        <span className={${styles.searchFilterName} styles.dd}>Hasta $7.000</span>
        <span className={${styles.searchFilterName} styles.dd}>De $7.000 a $10.000</span>
        <span className={${styles.searchFilterName} styles.dd}>Mas de $10.000</span>
        <span>
          <input type="number" name="minimum" placeholder="Minimo" />
          --
          <input type="number" name="maximum" placeholder="Maximo" />
        </span>
      </div> */}
		</div>
	);
};

export default Sidebar;
