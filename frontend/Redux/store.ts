import {configureStore} from '@reduxjs/toolkit'
import userSlice from './Slice/userSlice'

const store = configureStore({
    reducer:{
        user:userSlice.reducer
    }
})

export default store;
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>