import React, {useEffect, useState} from 'react';
import {useGetSingleArticleQuery, useUpdateArticleMutation} from "../../../redux/feature/articleAPI/articleAPI.js";
import {useParams} from "react-router-dom";
import Loading from "../../Loading/Loading.jsx";
import axios from "axios";
import {getBaseURL} from "../../../utilitis/utilitis.js";

const UpdatePost = () => {

    const {id} = useParams();
    const {data} = useGetSingleArticleQuery(id);
    const articleData = data?.data?.data || {};
    const {title, description, category, image} = articleData || {};
    const [newdata, {isLoading}] = useUpdateArticleMutation();
    const [upload, setUpload] = useState(false);

    const [inputdata, setinputdata] = useState({
        title: "",
        description: "",
        image: "",
        category: ""
    });

    useEffect(() => {
        if (articleData) {
            setinputdata({
                title: title || "",
                description: description || "",
                image: image || null,
                category: category || ""
            });
        }
    }, [articleData]);

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setinputdata((prev) => ({
                ...prev,
                image: reader.result,  // fixed typo here (was Image)
            }));
        };
        reader.readAsDataURL(file);
    };

    const HandleonChange = (e) => {
        const {name, value, files, type} = e.target;

        if (type === "file") {
            handleImageUpload(files[0]);
        } else {
            setinputdata({
                ...inputdata,
                [name]: value
            });
        }
    };

    const HandleonSubmmit = async (e) => {
        e.preventDefault();
        setUpload(true);
        try {
            const imageUploadResponse = await axios.post(`${getBaseURL()}/uploadImage`, {
                image: inputdata.image, // base64 string
            });

            const imageUrl = imageUploadResponse.data;

            const Updatedata = {
                title: inputdata.title,
                description: inputdata.description,
                image: imageUrl,
                category: inputdata.category,
            };
            await newdata({id, newdata: Updatedata}).unwrap();
            alert("product successfully updated");

        } catch (error) {
            console.log(error);
        } finally {
            setUpload(false);
        }
    };

    if (isLoading || upload) return (
        <div className="flex justify-center mt-10">
            <Loading/>
        </div>
    );

    return (
        <div className="p-4">
            {/* Use flex-wrap and gap for responsiveness */}
            <div className="flex flex-col sm:flex-row sm:gap-4 mb-4">
                <input
                    value={inputdata.title}
                    onChange={HandleonChange}
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="w-full mb-3 sm:mb-0 border border-gray-300 rounded px-3 py-2"
                />
                <select
                    value={inputdata.category}
                    onChange={HandleonChange}
                    name="category"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                >
                    <option value="">Select a Category</option>
                    <option value="Tech">Tech</option>
                    <option value="News">News</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
            </div>

            <div className="mb-4 border-2 border-dotted border-gray-300 rounded px-3 py-4">
                <input
                    onChange={HandleonChange}
                    name="image"
                    type="file"
                    className="w-full"
                />
            </div>

            <div className="mb-4">
                <textarea
                    value={inputdata.description}
                    onChange={HandleonChange}
                    name="description"
                    placeholder="Write something here..."
                    rows="8"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>

            <button
                onClick={HandleonSubmmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded cursor-pointer"
            >
                Publish Your Article
            </button>
        </div>
    );
};

export default UpdatePost;
