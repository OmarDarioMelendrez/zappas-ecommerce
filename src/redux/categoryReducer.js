import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategorys = createAsyncThunk("GET_CATEGORYS", () => {
  return axios.get(`/api/category`).then((response) => {
    return response.data;
  });
});

export const createCategory = createAsyncThunk(
  "CREATE_CATEGORY",
  (category) => {
    return axios.post(`/api/category`, { name: category }).then((response) => {
      return response.data;
    });
  }
);

export const setCategory = createAsyncThunk("SET_CATEGORY", (data) => {
  return axios.patch(`/api/category/${data.id}`,{name: data.category } ).then((response) => {
    return response.data;
  });
});

export const deleteCategory = createAsyncThunk(
  "DELETE_CATEGORY",
  (categoryId) => {
    return axios.delete(`/api/category/${categoryId}`).then((res) => {
      return axios.get("/api/category").then((res) => {
        return res.data;
      });
    });
  }
);

const initialState = {
  results: [],
};

const categoryReducer = createReducer(initialState, {
  [getCategorys.fulfilled]: (state, action) => ({
    ...state,
    results: action.payload,
  }),
  [setCategory.fulfilled]: (state, action) => ({
    ...state,
    results: action.payload,
  }),
  [createCategory.fulfilled]: (state, action) => ({
    ...state,
    results: action.payload,
  }),
  [deleteCategory.fulfilled]: (state, action) => ({
    ...state,
    results: action.payload,
  }),
});

export default categoryReducer;
