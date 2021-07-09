import React from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import Item from '../../../Item'

const ListProducts = () => {

    const products = useSelector((state) => state.products.results);

    const productos = products.map((product) => {
      return <Item key={product.id} product={product} />;
    });

	return (
        <>
        {productos}
        </>
	)
}

export default ListProducts