import React, { useState } from 'react';
import { X } from "lucide-react";
import { useUpdateUserMutation } from "../../../redux/feature/user/userAPI.js";
import { useSelector } from "react-redux";
import { getBaseURL } from "../../../utilitis/utilitis.js";
import axios from "axios";
import ButtonLoader from "./buttonLoader.jsx";

const UpdateProfile = ({ isModalOpen, HandleModalclose }) => {
    if (!isModalOpen) return null;

    const { user } = useSelector((state) => state.auth);
    const [updateUser, { isLoading }] = useUpdateUserMutation();
    const [uploading, setUpload] = useState(false);

    const [inputForm, setinputForm] = useState({
        username: "",
        Image: null,
        bio: "",
        profession: "",
    });

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setinputForm((prev) => ({
                ...prev,
                Image: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    };

    const HandleonChange = (e) => {
        const { name, value, files, type } = e.target;

        if (type === "file") {
            handleImageUpload(files[0]);
        } else {
            setinputForm({
                ...inputForm,
                [name]: value,
            });
        }
    };

    const HandleonSubmmit = async (e) => {
        e.preventDefault();
        setUpload(true);
        try {
            const imageUploadResponse = await axios.post(`${getBaseURL()}/uploadImage`, {
                image: inputForm.Image,
            });

            const imageUrl = imageUploadResponse.data;

            const Updatedata = {
                username: inputForm.username,
                bio: inputForm.bio,
                profileImage: imageUrl,
                profession: inputForm.profession,
            };
            await updateUser({ id: user?._id, ...Updatedata }).unwrap();
            alert("Profile successfully updated");

            setinputForm({
                username: "",
                Image: null,
                bio: "",
                profession: "",
            });
            HandleModalclose(); // Close modal after success
        } catch (error) {
            console.log(error);
        } finally {
            setUpload(false);
        }
    };

    return (
        <div className="fixed inset-0  backdrop-brightness-50 flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded-lg w-[95%] sm:w-[400px] p-5 sm:p-6 relative max-h-[95vh] overflow-y-auto">
                <button
                    onClick={HandleModalclose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    <X size={20} />
                </button>
                <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
                <form onSubmit={HandleonSubmmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            value={inputForm.username}
                            onChange={HandleonChange}
                            type="text"
                            name="username"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Profile Image</label>
                        <input
                            onChange={HandleonChange}
                            type="file"
                            name="Image"
                            className="w-full text-sm file:mr-2 file:py-1 file:px-3 file:border-0 file:bg-blue-600 file:text-white file:rounded-md hover:file:bg-blue-700"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <textarea
                            value={inputForm.bio}
                            onChange={HandleonChange}
                            name="bio"
                            rows="3"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Profession</label>
                        <input
                            value={inputForm.profession}
                            onChange={HandleonChange}
                            type="text"
                            name="profession"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || uploading}
                        className={`w-full py-2 rounded-md text-white flex justify-center items-center ${
                            isLoading || uploading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {isLoading || uploading ? <ButtonLoader text="Saving..." /> : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
