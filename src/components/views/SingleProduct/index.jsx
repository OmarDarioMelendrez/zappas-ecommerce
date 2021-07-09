import React, { useEffect, useState } from "react";
import Header from "../../Header";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../../redux/productReducer";
import { useParams } from "react-router";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import BuyForm from "../../BuyForm";
import ImageViewer from "../../ImageViewer";
import Reviews from "../../Reviews";

const SingleProduct = () => {
	const dispatch = useDispatch();
	let { id } = useParams();

	useEffect(() => {
		dispatch(getProductDetail(id));
	}, []);

	const productDetail = useSelector((state) => state.products.productDetail);

	const [modelId, setModel] = useState(0);
	const [img, setImg] = useState(null);

	useEffect(() => {
		setImg(productDetail?.productModels[0]?.images[0]);
	}, [productDetail]);

	let average = productDetail.raiting;

	const stars = Array(5)
		.fill(0)
		.map((v, i) => (
			<FontAwesomeIcon key={i} icon={i < average ? faStarSolid : faStar} />
		));

	const selectModel = (id) => {
		setModel(id);
		setImg(productDetail.productModels[id].images[0]);
	};

	let model = productDetail.productModels[modelId];

	return (
		<>
			<div className={`container ${styles.single_product}`}>
				<div className={styles.name}>
					<h1>
						<a href="?">{productDetail.brand}</a>
						<span>{productDetail.name}</span>
					</h1>
				</div>
				<div className={styles.stars}>{stars}</div>
				{model && <BuyForm
					productDetail={productDetail}
					selectModel={selectModel}
					model={model}
				/>}
				<ImageViewer model={model} setImg={setImg} img={img} />
			</div>
			<Reviews/>
		</>
	);
};

export default SingleProduct;
