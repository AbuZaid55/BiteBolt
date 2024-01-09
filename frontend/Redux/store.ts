import {configureStore} from '@reduxjs/toolkit'
import userSlice from './Slice/userSlice'
import productSlice from './Slice/productSlice';
import categorySlice from './Slice/categorySlice';

const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        product:productSlice.reducer,
        category:categorySlice.reducer
    }
})

export default store;
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>