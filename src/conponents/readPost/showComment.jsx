import React, { useState } from 'react';
import { ThumbsUp, Edit2, Trash2 } from 'lucide-react';
import { useParams } from "react-router-dom";
import image from "../../assets/avatar.png";
import { useDeleteReviewMutation } from "../../redux/feature/Review/reviewAPI.js";
import { confirmDelete, showError, showSuccess } from "../../utilitis/sweetalertHelper.js";

const ShowComment = ({ refetch, userData }) => {
    const { id } = useParams();
    const [deleteReview] = useDeleteReviewMutation(id);

    const HandleonDelete = async (id) => {
        const result = await confirmDelete();
        if (result.isConfirmed) {
            try {
                await deleteReview(id).unwrap();
                showSuccess("Successfully deleted");
                refetch();
            } catch (err) {
                console.log(err);
                showError("Something went wrong");
            }
        }
    };

    const [likedComments, setLikedComments] = useState(() => {
        const stored = localStorage.getItem("likedComments");
        return stored ? JSON.parse(stored) : {};
    });

    const toggleLike = (commentId) => {
        const updated = { ...likedComments, [commentId]: !likedComments[commentId] };
        setLikedComments(updated);
        localStorage.setItem("likedComments", JSON.stringify(updated));
    };

    return (
        <div className="max-w-[900px] mx-auto mt-6 rounded-md p-4 px-3 sm:px-6 bg-white shadow-md">
            <h2 className="text-lg font-medium mb-5">
                Comments{" "}
                <span className="ml-1 bg-gray-200 px-2 py-0.5 rounded text-sm">
          {userData.length}
        </span>
            </h2>

            {userData.length > 0 ? (
                userData.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row items-start gap-3 mb-6 border-b pb-4"
                    >
                        {/* Avatar */}
                        <img
                            src={image}
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />

                        {/* Comment Content */}
                        <div className="flex-1 w-full">
                            <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-semibold text-gray-800">
                  @{item?.userID?.username}
                </span>
                                <span className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
                            </div>

                            <p className="text-sm mt-1 text-gray-700 break-words">
                                {item?.comment}
                            </p>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                                <button
                                    onClick={() => toggleLike(item._id)}
                                    className={`flex items-center gap-1 transition cursor-pointer 
                    ${likedComments[item._id] ? 'text-blue-600' : 'text-gray-500'} 
                    hover:text-blue-700`}
                                >
                                    <ThumbsUp size={16} />
                                    Like
                                </button>

                                <button className="flex items-center gap-1 hover:text-black transition cursor-pointer">
                                    <Edit2 size={16} />
                                    Edit
                                </button>

                                <button
                                    onClick={() => HandleonDelete(item?._id)}
                                    className="flex items-center gap-1 hover:text-black transition cursor-pointer"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-sm text-gray-500">No Comments Found...</div>
            )}
        </div>
    );
};

export default ShowComment;
