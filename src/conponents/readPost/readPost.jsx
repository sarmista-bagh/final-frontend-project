import React from 'react';
import { useGetSingleArticleQuery } from "../../redux/feature/articleAPI/articleAPI.js";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";
import Advertize from "./advertize.jsx";
import Comment from "./comment.jsx";
import ShowComment from "./showComment.jsx";

const ReadPost = () => {
    const { id } = useParams();
    const { data, error, isLoading, refetch } = useGetSingleArticleQuery(id);

    const newsData = data?.data?.data || {};
    const { category, image, description, title, createdAt } = newsData;

    const userData = data?.data?.reviewData || [];

    if (isLoading) {
        return (
            <div className="flex justify-center mt-10">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center mt-10 text-red-600 px-4">
                <p className="text-lg font-semibold text-center">Failed to load the article.</p>
                <p className="text-sm text-gray-600 text-center">
                    {error?.error || "Something went wrong. Please try again later."}
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto p-4 sm:p-6 mt-6 sm:mt-10 bg-white overflow-hidden">
            {/* Title */}
            <div className="mb-6 text-center px-2 sm:px-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 hover:text-indigo-600 transition duration-300">
                    {title}
                </h1>
                <span className="inline-block mt-3 px-4 py-1 text-xs sm:text-sm bg-indigo-100 text-indigo-700 rounded-full font-medium border border-indigo-200 shadow-sm">
          {category}
        </span>
            </div>

            {/* Image */}
            {image && (
                <div className="overflow-hidden rounded-xl shadow-lg mb-4 sm:mb-6">
                    <img
                        src={image}
                        alt="Article"
                        className="w-full max-h-[300px] sm:max-h-[500px] object-cover transform hover:scale-105 transition duration-500"
                    />
                </div>
            )}

            {/* Date and Read Time */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-500 mb-6 px-1 border-b pb-2 gap-1 sm:gap-0">
                <p>{new Date(createdAt).toLocaleDateString()}</p>
                <p className="italic">15 mins read</p>
            </div>

            {/* Description */}
            <div className="px-2 sm:px-4 space-y-4 text-justify">
                <p className="font-semibold text-sm sm:text-base">{description}</p>
            </div>

            {/* Advertise, Comment, ShowComment */}
            <div className="mt-8 px-2 sm:px-0">
                <Advertize />
            </div>
            <div className="mt-6 px-2 sm:px-0">
                <Comment refetch={refetch} />
            </div>
            <div className="mt-6 px-2 sm:px-0">
                <ShowComment refetch={refetch} userData={userData} />
            </div>
        </div>
    );
};

export default ReadPost;
