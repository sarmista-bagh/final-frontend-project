import {createApi,fetchBaseQuery}  from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "../../../utilitis/utilitis.js";

const articleAPI=createApi({
    reducerPath:"articleAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/article`,
        credentials:'include'
    }),
    tagTypes:['article'],
    endpoints:(builder)=>({
        articlePost:builder.mutation({
            query:(data)=>({
                url:"/creat-post",
                method:"POST",
                body:data
            })
        }),
        getAllArticles:builder.query({
            query:()=>({
                url:"/getall-post",
                method:"GET",
            })
        }),
        deleteArticle:builder.mutation({
            query:(id)=>({
                url:`/delete-post/${id}`,
                method:"DELETE",
                credentials:'include'
            })
        }),
        updateArticle:builder.mutation({
            query:({id,newdata})=>({
                url:`/update-post/${id}`,
                method:"POST",
                body:newdata,
                credentials:'include'
            })
        }),
        getSingleArticle:builder.query({
            query:(id)=>({
                url:`/getsingle-post/${id}`,
                method:"GET",
                credentials:'include'
            })
        }),
        getArticleFilter:builder.query({
            query:({category})=>{
              const queryParams=new URLSearchParams({
                  category:category || ''
              })
                return `get-query?${queryParams}`
            }
        }),
    })
})

export const {useArticlePostMutation,useGetAllArticlesQuery,useDeleteArticleMutation,useUpdateArticleMutation,useGetSingleArticleQuery,useGetArticleFilterQuery}=articleAPI;
export default articleAPI;