import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center items-center lg:pt-36 pt-24 gap-5">
            <figure className="w-auto lg:h-80 h-72">
                <img className="w-full h-full" src="error.jpg" alt="Background image of Error" />
            </figure>

            <h2 className="text-3xl text-rose-600 font-bold">Page Not Found: 404</h2>

            <Link to="/"><button className="btn btn-outline hover:bg-emerald-500 hover:border-none rounded-full shadow-md shadow-emerald-200 border border-gray-300 text-lg font-bold px-8">Go Back Home</button></Link>
        </div>
    );
};

export default ErrorPage;