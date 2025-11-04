import {createApi,fetchBaseQuery}  from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "../../../utilitis/utilitis.js";

const userAPI=createApi({
    reducerPath:"userAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/user`,
        credentials:'include'
    }),
    tagTypes:['user'],
    endpoints:(builder)=>({
        getAllusers:builder.query({
            query:()=>({
                url:"/get-alluser",
                method:"GET",
                credentials:'include'
            })
        }),
        deleteUser:builder.mutation({
            query:(id)=>({
                url:`/delete-user/${id}`,
                method:"DELETE",
                credentials:'include'
            })
        }),
        updateUser:builder.mutation({
            query:({id,...body})=>({
                url:`/update-user/${id}`,
                method:"POST",
                body,
                credentials:'include'
            }),
            invalidatesTags: ['user'],
        }),
        getSingleUser:builder.query({
            query:(id)=>({
                url:`/get-singleuser/${id}`,
                method:"GET",
                credentials:'include'
            })
        })
    })
})

export const {useGetAllusersQuery,useDeleteUserMutation,useUpdateUserMutation,useGetSingleUserQuery}=userAPI
export default userAPI