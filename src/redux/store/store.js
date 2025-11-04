import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../reducer/productSlice'
import cartReducer from '../reducer/cartSlice'


const store = configureStore({
reducer: {
products: productsReducer,
cart: cartReducer,
},
})


export default store