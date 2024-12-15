import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import useAuth from "../context/useAuth";
import Loading from "../components/Loading";

const Main = () => {
    const {loading} = useAuth();

    if(loading){
        return <Loading />
    };

    return (
        <div>
            <Navbar />
            <section className="pt-12 min-h-[calc(100vh-270px)]">
            <Outlet />
            </section>
            <Footer />
        </div>
    );
};

export default Main;