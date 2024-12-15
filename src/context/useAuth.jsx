import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
    const sharedContext = useContext(AuthContext);

    return sharedContext;
};

export default useAuth;