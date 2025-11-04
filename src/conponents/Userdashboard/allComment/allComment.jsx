import React from 'react';
import { useGetAllReviewsQuery } from "../../../redux/feature/Review/reviewAPI.js";
import { useSelector } from "react-redux";
import Loading from "../../Loading/Loading.jsx";

const AllComment = () => {
    const { user } = useSelector((state) => state.auth);
    const { data, error, isLoading } = useGetAllReviewsQuery(user?._id);

    const reviewData = data?.data || [];

    if (isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading />
        </div>
    );

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center mt-10 text-red-600">
                <p className="text-lg font-semibold">Failed to load articles.</p>
                <p className="text-sm text-gray-600">
                    {error?.error || "Something went wrong. Please try again later."}
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-[1100px] mx-auto px-3 mt-10">
            <h2 className="text-xl font-bold mb-4 text-center sm:text-left">Your Given Reviews</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviewData.map((item, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4 bg-white space-y-1"
                    >
                        <p><strong>Rating:</strong> {item.ratting}</p>
                        <p><strong>Comment:</strong> {item.comment}</p>
                        <p className="text-sm text-gray-600 break-words">
                            <strong>Article ID:</strong> {item.articleID}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Created At:</strong> {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}

                <div
                    className="flex items-center justify-center border border-gray-300 rounded-lg shadow-sm p-4 bg-gray-100 text-center hover:bg-gray-200 cursor-pointer min-h-[100px]"
                >
                    <span className="text-base font-semibold text-gray-700">+ Add New Review</span>
                </div>
            </div>
        </div>
    );
};

export default AllComment;
