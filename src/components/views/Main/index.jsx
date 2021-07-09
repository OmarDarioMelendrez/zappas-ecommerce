import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../Sidebar";
import Card from "../../Card";
import ReactPaginate from "react-paginate";
import styles from "./styles.module.css";

const MainLayout = () => {
	const products = useSelector((state) => state.products.results);
	const [currentPage, setCurrentPage] = useState(0);
	const per_page = 16;

	const offset = currentPage * per_page;

	const currentPageData = products

		.slice(offset, offset + per_page)
		.map((product) => {
			return <Card key={product.id} product={product} />;
		});

	const pageCount = Math.ceil(products.length / per_page);

	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
	}

	return (
		<>
			<div className={`container ${styles.main_layout}`}>
				<Sidebar />
				<div className={styles.products_grid}>{currentPageData}</div>
				<ReactPaginate
					previousLabel={"← Previous"}
					nextLabel={"Next →"}
					pageCount={pageCount}
					onPageChange={handlePageClick}
					containerClassName={styles.pagination_container}
					previousLinkClassName={styles.pagination_previous}
					nextLinkClassName={styles.pagination_link}
					disabledClassName={styles.pagination_link_disabled}
					activeClassName={styles.pagination_link_active}
				/>
			</div>
		</>
	);
};

export default MainLayout;
