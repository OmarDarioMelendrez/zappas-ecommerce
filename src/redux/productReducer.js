import axios from "axios";
import { createAction, createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("GET_PRODUCTS", (search) => {
    return axios.get(`/api/product?all=${search === "" ? 'true' : 'false'}&category=&search=${search}`)
    .then((response) => {
        return response.data
    })
})

export const getCategory = createAsyncThunk("GET_CATEGORY", (category) => {
    return axios.get(`/api/product?all=false&category=${category}&search=`)
        .then(response => response.data)
})

export const getProductDetail = createAsyncThunk("GET_PRODUCT_DETAIL", (id) => {
    return axios.get(`/api/product/${id}`)
    .then((response) => {
        return response.data
    })
})

export const deleteProduct = createAsyncThunk("DELETE_PRODUCT", (id) => {
    return axios.delete(`/api/product/${id}`)
    .then(() => {
        return axios.get(`/api/product?all=true&category=&search=`)
        .then(response => response.data)
    })
})

export const createProduct = createAsyncThunk("CREATE_PRODUCT", (product) => {
    return axios.post('/api/product', product)
    .then((response) => {
    // .then(async (response) => {
        // let id = response.data.product.id
        // for(let model of product.productModels) {
        //     let data = await axios.post(`/api/product/${id}/addModel`, model).data
        //     console.log('data?:', data)
        // }
        return response.data
    })
})

export const editProduct = createAsyncThunk("UPDATE_PRODUCT", ({pid, product}) => {
    return axios.put('/api/product/'+pid, product)
    .then((response) =>response.data)
})

export const clearJustCreated = createAction('CLEAR_JUST_CREATED')
export const clearJustEdited = createAction('CLEAR_JUST_EDITED')

const initialState = {
    results: [],
    productDetail: {
        productModels: []
    },
    justCreated: null,
    justEdited: null,
};

const productReducer = createReducer(initialState, {
  [getProducts.fulfilled]:(state, action) => ({...state, results: action.payload.products}),
  [getCategory.fulfilled]:(state, action) => ({...state, results: action.payload.products}),
  [getProductDetail.fulfilled]:(state, action) => ({...state, productDetail: action.payload}),
  [deleteProduct.fulfilled]:(state, action) => ({...state, results: action.payload.products}),
  [createProduct.fulfilled]:(state, action) => ({...state, justCreated: action.payload.product.id}),
  [editProduct.fulfilled]:(state, action) => ({...state, justEdited: true}),
  'CLEAR_JUST_CREATED': (state, action) => ({...state, justCreated: null}),
  'CLEAR_JUST_EDITED': (state, action) => ({...state, justEdited: null})
});

export default productReducer;