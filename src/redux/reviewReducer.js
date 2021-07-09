import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"

export const getReviews = createAsyncThunk("GET_REVIEWS", (productId) => {
  return axios.get(`/api/reviews/${productId}`)
  .then((response) => {
      return response.data
  })
})

export const createReview = createAsyncThunk("CREATE_REVIEW", ({id, reviewForm}) => {
  return axios.post(`/api/reviews/${id}`, reviewForm)
  .then(() => {
    return axios.get(`/api/reviews/${id}`).then((response) => {
      return response.data;
    })
  })
})

export const deleteReview = createAsyncThunk("DELETE_REVIEW", (id) => {
  return axios.delete('/api/reviews')
  .then(() => {
    return axios.get(`/api/reviews/${id}`).then((response) => {
      return response.data;
    })
  })
})

const initialState = { 
  reviews: [],
}

const reviewReducer = createReducer(initialState, {
  [getReviews.fulfilled]:(state, action) => ({...state, reviews: action.payload}),
  [createReview.fulfilled]:(state, action) => ({...state, reviews: action.payload }),
  [deleteReview.fulfilled]:(state, action) => {return state;}
});

export default reviewReducer;