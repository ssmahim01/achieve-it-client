import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../ErrorPage/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllCourses from "../pages/AllCourses";
import AddCourse from "../pages/AddCourse";
import PrivateRoute from "../routes/PrivateRoute";
import CourseDetails from "../pages/CourseDetails";
import axios from "axios";
import MyBids from "../pages/MyBids";
import BidRequests from "../pages/BidRequests";
import MyPostedCourses from "../pages/MyPostedCourses";
import UpdateCourse from "../pages/UpdateCourse";

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
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Register />,
      },
      {
        path: "/allCourses",
        element: <AllCourses />,
      },
      {
        path: "/course/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/course/${params.id}`),
        element: (
          <PrivateRoute>
            <CourseDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-course",
        element: (
          <PrivateRoute>
            <AddCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-posted-courses",
        // loader: () => fetch(`${import.meta.env.VITE_API_URL}/courses`),
        element: <MyPostedCourses />
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        ),
      },
      {
        path: "/bid-requests",
        element: (
          <PrivateRoute>
            <BidRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-course/:id",
        element: <UpdateCourse />
      },
    ],
  },
]);

export default router;
