import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";


// //CREATE ORDER
// export const createOrder = createAsyncThunk("CREATE_ORDER", (userID) => {
//     return axios.post(`/api/${userID}`)
//     .then((response) => {
//         return response.data
//     })
// })

//ADD PRODUCT TO USER CART
export const addProductToCart = createAsyncThunk("ADD_PRODUCT_TO_CART", (modelId, thunkApi) => {
    const {cart} = thunkApi.getState()
    return axios.post(`/api/cart/${cart.cart.id}/addProduct`, {
        productModelId : modelId,
        quantity: 1
    })
    .then(() => {
        return axios.get(`/api/cart/${cart.cart.id}`).then(response => response.data.order)
    })
})
// DECREMENT QUANTITY OF SINGLE PRODUCT IN CART
export const decrementProduct = createAsyncThunk("DECREMENT_PRODUCT_OF_CART", (data, thunkApi) => {
    const {cart} = thunkApi.getState()
    return axios.patch(`/api/cart/${data.orderDetailId}/decrement`, {productModelId: data.productModelId})
        .then(() => {
            return axios.get(`/api/cart/${cart.cart.id}`).then(response => response.data.order)
        })
})

// INCREMENT QUANTITY OF SINGLE PRODUCT IN CART
export const incrementeProduct = createAsyncThunk("INCREMENT_PRODUCT_OF_CART", (data, thunkApi) => {
    const {cart} = thunkApi.getState()
    return axios.patch(`/api/cart/${data.orderDetailId}/increment`, {productModelId: data.productModelId})
        .then(() => {
            return axios.get(`/api/cart/${cart.cart.id}`).then(response => response.data.order)
        })
})

// CREATE CART OR RECOVER OF THE DATABASE
export const createCartOrRecover = createAsyncThunk("CREATE_OR_RECOVER_CART", (data, thunkApi) => {
    const {user} = thunkApi.getState()
    return axios.post(`/api/cart/${user.id}`).then(response => response.data.order)
})

// DELETE PRODUCT OF THE CART
export const deleteProductOfCart = createAsyncThunk("DELETE_PRODUCT_OF_THE_CART", (orderDetailId, thunkApi) => {
    const {cart} = thunkApi.getState()
    return axios.delete(`/api/cart/${orderDetailId}`)
        .then(() => {
            return axios.get(`/api/cart/${cart.cart.id}`).then(response => response.data.order)
        })
})

const initialState = {
    cart: {
        order_details: []
    },
};

const cartReducer = createReducer(initialState, {
  [addProductToCart.fulfilled]:(state, action) => ({...state, cart: action.payload}),
  [createCartOrRecover.fulfilled]:(state, action) => ({...state, cart: action.payload}),
  [incrementeProduct.fulfilled]:(state, action) => ({...state, cart: action.payload}),
  [decrementProduct.fulfilled]:(state, action) => ({...state, cart: action.payload}),
  [deleteProductOfCart.fulfilled]:(state, action) => ({...state, cart: action.payload}),
});

export default cartReducer;