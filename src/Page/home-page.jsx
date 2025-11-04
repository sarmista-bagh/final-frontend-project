import React from 'react';
import Header from "../conponents/Home/header.jsx";
import CardSection from "../conponents/Home/cardSection.jsx";
import Blog from "../conponents/Home/blog.jsx";
import PostArticle from "../conponents/Home/postArticle.jsx";

const HomePage = () => {
    return (
        <>
            <Header/>
            <CardSection/>
            <Blog/>
            <PostArticle/>
        </>
    );
};

export default HomePage;