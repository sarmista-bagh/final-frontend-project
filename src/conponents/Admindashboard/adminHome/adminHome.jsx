import React from 'react';
import AllUserchart from "./allUserchart.jsx";
import TotalComentchart from "./totalComentchart.jsx";
import TotalPostchart from "./totalPostchart.jsx";
import {useAdminStateQuery} from "../../../redux/feature/state/stateAPI.js";
import Loading from "../../Loading/Loading.jsx";
import ResentUser from "./resentUser.jsx";
import ResentPost from "./resentPost.jsx";

const AdminHome = () => {
    const {data,error,isLoading}=useAdminStateQuery();
    const {totalPostallTime,totalReviews,totalUser} = data || {};

    if(isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading/>
        </div>
    );

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center mt-10 text-red-600 px-4">
                <p className="text-lg font-semibold">Failed to load articles.</p>
                <p className="text-sm text-gray-600 text-center">
                    {error?.error || "Something went wrong. Please try again later."}
                </p>
            </div>
        );
    }

    return (
        <>
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 max-w-full">
                <AllUserchart totalUser={totalUser}/>
                <TotalComentchart totalReviews={totalReviews}/>
                <TotalPostchart totalPostallTime={totalPostallTime}/>
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 max-w-full mt-10">
                <ResentUser/>
                <ResentPost/>
            </section>
        </>
    );
};

export default AdminHome;
