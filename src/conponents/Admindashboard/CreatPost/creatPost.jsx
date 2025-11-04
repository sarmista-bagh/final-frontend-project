import React, {useRef, useState} from 'react';
import {useArticlePostMutation} from "../../../redux/feature/articleAPI/articleAPI.js";
import {useSelector} from "react-redux";
import axios from "axios";
import {getBaseURL} from "../../../utilitis/utilitis.js";
import ButtonLoader from "../../Userdashboard/Profile/buttonLoader.jsx";

const CreatPost = () => {

    const [data,{isLoading}] = useArticlePostMutation();
    const {user} = useSelector((state) => state.auth);
    const [upload, setUpload] = useState(false);
    const fileInputRef = useRef(null);
    const [inputForm, setInputForm] = useState({
        title: '',
        description: '',
        Image: '',
        category: '',
    });

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setInputForm((prev) => ({
                ...prev,
                Image: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    };

    const HandleonChange = (e) => {
        const {name, value, type, files} = e.target;

        if(type === 'file'){
            handleImageUpload(files[0]);
        } else {
            setInputForm({
                ...inputForm,
                [name]: value
            });
        }
    };

    const HandleonSubmit = async (e) => {
        e.preventDefault();
        setUpload(true);

        try {
            const imageUploadResponse = await axios.post(`${getBaseURL()}/uploadImage`, {
                image: inputForm.Image, // base64 string
            });

            const imageUrl = imageUploadResponse.data;

            const newData = {
                title: inputForm.title,
                description: inputForm.description,
                image: imageUrl,
                category: inputForm.category,
                author: user?._id
            };

            await data(newData).unwrap();
            alert("Article uploaded successfully.");
            setInputForm({
                title: '',
                description: '',
                Image: '',
                category: '',
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        } catch (err) {
            console.log(err);
        } finally {
            setUpload(false);
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-col sm:flex-row sm:gap-4 mb-4">
                <input
                    value={inputForm.title}
                    onChange={HandleonChange}
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="w-full mb-3 sm:mb-0 border border-gray-300 rounded px-3 py-2"
                />
                <select
                    value={inputForm.category}
                    onChange={HandleonChange}
                    name="category"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                >
                    <option value="">Select a Category</option>
                    <option value="world">World</option>
                    <option value="business">Business</option>
                    <option value="technology">Technology</option>
                    <option value="sport">Sport</option>
                    <option value="entertainment">Entertainment</option>
                </select>
            </div>

            <div className="mb-4 border-2 border-dotted border-gray-300 rounded px-3 py-4">
                <input
                    onChange={HandleonChange}
                    ref={fileInputRef}
                    name="image"
                    type="file"
                    className="w-full"
                />
            </div>

            <div className="mb-4">
                <textarea
                    value={inputForm.description}
                    onChange={HandleonChange}
                    name="description"
                    placeholder="Write something here..."
                    rows="8"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                ></textarea>
            </div>
            <button
                onClick={HandleonSubmit}
                type="submit"
                disabled={isLoading || upload}
                className={`w-full py-2 rounded-md text-white flex justify-center items-center ${
                    isLoading || upload
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
                {isLoading || upload ? <ButtonLoader text="Saving..."/> : "Publish Your Article"}
            </button>
        </div>
    );
};

export default CreatPost;
