import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer"
import logger from "redux-logger";
import reviewReducer from "./reviewReducer";


const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
      user: userReducer,
      products: productReducer,
      cart: cartReducer,
      reviews: reviewReducer,
      categorys: categoryReducer,
  },
});

export default store;