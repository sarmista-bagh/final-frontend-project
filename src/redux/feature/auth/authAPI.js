import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "../../../utilitis/utilitis.js";
import {setToken} from "../../../utilitis/sessionHelper.js";

const authAPI = createApi({
    reducerPath:"authAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/auth`,
        credentials:'include'
    }),
    tagTypes:['User'],
    endpoints:(builder)=>({
        signUp:builder.mutation({
            query:(newUser)=>({
                url:"/register",
                method:'POST',
                body:newUser
            })
        }),
        Login:builder.mutation({
            query:(userdata)=>({
                url:"/login",
                method:'POST',
                body:userdata
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    setToken(data.token);
                } catch (err) {
                    console.error("Login failed:", err);
                }
            }
        }),
        Logout:builder.mutation({
            query:()=>({
                url:"/logout",
                method:'POST',
            })
        })
    })
})

export const {useSignUpMutation,useLoginMutation,useLogoutMutation}=authAPI

export default authAPI