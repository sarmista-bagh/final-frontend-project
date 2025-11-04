import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./conponents/Layout/navbar.jsx";
import Footer from "./conponents/Layout/footer.jsx";
import {Toaster} from "react-hot-toast";

const App = () => {
    return (
        <>
            <Navbar/>
            <Toaster position="top-center"/>
          <Outlet/>
            <Footer/>
        </>
    );
};

export default App;