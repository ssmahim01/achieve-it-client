import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../context/useAuth";
import Loading from "../components/Loading";

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user, loading} = useAuth();

    if(user){
        return children;
    };

    if(loading){
        return <Loading />
    };

    return (
       <Navigate to="/login" state={location.pathname} />
    );
};

export default PrivateRoute;