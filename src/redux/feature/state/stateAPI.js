import {createApi,fetchBaseQuery}  from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "../../../utilitis/utilitis.js";


const stateAPI=createApi({
    reducerPath:"stateAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/state`,
        credentials:'include'
    }),
    tagTypes:['state'],
    endpoints:(builder)=>({
        adminState:builder.query({
            query:()=>({
                url:'/admin-state',
                method:'GET',
                credentials:'include'
            })
        })
    })
})

export const {useAdminStateQuery}=stateAPI;
export default stateAPI;