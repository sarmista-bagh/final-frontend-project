import {createSlice} from "@reduxjs/toolkit"


const  StoreUserdata=()=> {
    try {
        const serializedState = localStorage.getItem('user')
        if (serializedState === null) return {user: null}
        return {user: JSON.parse(serializedState)}
    } catch (error) {
        console.log(error)
        return {user: null}
    }
}

const initialState=StoreUserdata()

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user',JSON.stringify(state.user))
        },
        logoutUser: (state) => {
            state.user=null
            localStorage.removeItem('user')
        }
    }
})

export const {setUser,logoutUser}=authSlice.actions;
export default authSlice.reducer