import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import HomePage from "../Page/home-page.jsx";
import AboutPage from "../Page/about-page.jsx";
import NewsArticlesPage from "../Page/newsArticles-page.jsx";
import LoginPage from "../Page/login-page.jsx";
import RegisterPage from "../Page/register-page.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Dashboard from "../dashboard.jsx";
import Profile from "../conponents/Userdashboard/Profile/Profile.jsx";
import CreatPost from "../conponents/Admindashboard/CreatPost/creatPost.jsx";
import YourArticles from "../conponents/Admindashboard/YourArticles/yourArticles.jsx";
import AllUser from "../conponents/Admindashboard/allUser/allUser.jsx";
import AllComment from "../conponents/Userdashboard/allComment/allComment.jsx";
import AdminHome from "../conponents/Admindashboard/adminHome/adminHome.jsx";
import UpdatePost from "../conponents/Admindashboard/YourArticles/updatePost.jsx";
import ReadPost from "../conponents/readPost/readPost.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/",
                element: <HomePage />
            },
            { path: "/about",
                element: <AboutPage />
            },
            { path: "/news-article",
                element: <NewsArticlesPage />
            },
            {
                path: "/read-post/:id",
                element: <ReadPost />
            }
        ],
    },
    { path: "/register",
        element: <RegisterPage />
    },
    { path: "/login",
        element: <LoginPage />
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
        children: [
            // user route
            {
                path: "profile",
                element: <Profile/>
            },
            {
                path: "all-comment",
                element: <AllComment/>
            },

            //admin route

            {
                path: "admin",
                element: <PrivateRoute role="admin"><AdminHome/></PrivateRoute>
            },
            {
                path: "creat-post",
                element: <PrivateRoute role="admin"><CreatPost/></PrivateRoute>
            },
            {
              path: "update-post/:id",
                element: <PrivateRoute role="admin"><UpdatePost/></PrivateRoute>
            },
            {
                path: "your-articles",
                element: <PrivateRoute role="admin"><YourArticles/></PrivateRoute>
            },
            {
                path: "all-user",
                element: <PrivateRoute role="admin"><AllUser/></PrivateRoute>
            },
        ]
    }
]);

export default router;