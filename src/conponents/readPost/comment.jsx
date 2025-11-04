import React, { useState } from 'react';
import { usePostReviewMutation } from "../../redux/feature/Review/reviewAPI.js";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../../utilitis/sessionHelper.js";

const Comment = ({ refetch }) => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    console.log(user)
    const [postReview] = usePostReviewMutation(id);
    const navigate = useNavigate();

    const [commentInput, setCommentInput] = useState({
        comment: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCommentInput({
            ...commentInput,
            [name]: value,
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (!getToken()) {
            alert("Please log in");
            navigate("/login");
            return;
        }

        const newComment = {
            comment: commentInput.comment,
            userID: user?._id,
            articleID: id,
        };

        try {
            await postReview(newComment).unwrap();
            alert("Successfully posted");
            setCommentInput({
                comment: '',
            });
            refetch();
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="max-w-[900px] mx-auto mt-6 px-4 sm:px-0">
            <form
                onSubmit={handleOnSubmit}
                className="border border-gray-300 rounded-md p-4 shadow-sm bg-gradient-to-b from-white to-gray-50"
            >
        <textarea
            value={commentInput.comment}
            onChange={handleChange}
            name="comment"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 resize-none text-sm sm:text-base"
            placeholder="Add a comment..."
        ></textarea>

                <div className="flex justify-end items-center mt-2">
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition cursor-pointer text-sm sm:text-base"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Comment;
