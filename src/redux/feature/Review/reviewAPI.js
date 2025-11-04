import {createApi,fetchBaseQuery}  from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "../../../utilitis/utilitis.js";


const reviewAPI=createApi({
    reducerPath:"reviewAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/review`,
        credentials:'include'
    }),
    tagTypes:['review'],
    endpoints:(builder)=>({
        getAllReviews:builder.query({
            query:(id)=>({
                url:`/get-review/${id}`,
                method:"GET",
                credentials:'include'
            })
        }),
        postReview:builder.mutation({
            query:(data)=>({
                url:'/post-review',
                method:"POST",
                body:data,
                credentials:'include'
            })
        }),
        deleteReview:builder.mutation({
            query:(id)=>({
                url:`/delete-review/${id}`,
                method:"DELETE",
                credentials:'include'
            })
        })
    })
})

export const {useGetAllReviewsQuery,usePostReviewMutation,useDeleteReviewMutation}=reviewAPI;
export default reviewAPI;