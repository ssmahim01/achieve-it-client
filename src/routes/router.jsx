import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../ErrorPage/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllCourses from "../pages/AllCourses";
import AddCourse from "../pages/AddCourse";
import PrivateRoute from "../routes/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/registration",
                element: <Register />
            },
            {
                path: "/allCourses",
                loader: () => fetch(`${import.meta.env.VITE_API_URL}/courses`),
                element: <AllCourses />
            },
            {
                path: "/add-course",
                element: <PrivateRoute><AddCourse /></PrivateRoute>
            },
        ]
    }
]);

export default router;