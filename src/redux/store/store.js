import {configureStore} from "@reduxjs/toolkit";
import authAPI from "../feature/auth/authAPI.js"
import authReducer from "../feature/auth/authSlice.jsx"
import articleAPI from "../feature/articleAPI/articleAPI.js";
import userAPI from "../feature/user/userAPI.js";
import stateAPI from "../feature/state/stateAPI.js";
import reviewAPI from "../feature/Review/reviewAPI.js";


export const store=configureStore({
    reducer:{
        [authAPI.reducerPath]:authAPI.reducer,
        auth:authReducer,
        [articleAPI.reducerPath]:articleAPI.reducer,
        [userAPI.reducerPath]:userAPI.reducer,
        [stateAPI.reducerPath]:stateAPI.reducer,
        [reviewAPI.reducerPath]:reviewAPI.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(authAPI.middleware,articleAPI.middleware,userAPI.middleware,stateAPI.middleware,reviewAPI.middleware)
})