import { motion } from "motion/react";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
      <div className="hero min-h-96 bg-base-200 rounded-lg mb-10">
          <div className="hero-content lg:flex-row flex-col p-7 justify-between items-center">
            <div className="flex-1">
                <figure className="md:block hidden">
                    <motion.img
                    animate={{y: [20, 40, 20]}}
                    transition={{duration: 6, repeat: Infinity}}
                    className="w-auto h-60 border-r-4 border-t-4 border-amber-500 rounded-xl"
                    src="IT-course(1).jpg" alt="First IT Course Image" />
                </figure>

                <figure className="md:block hidden">
                    <motion.img
                    animate={{x: [30, 80, 30]}}
                    transition={{duration: 6, repeat: Infinity}}
                    className="w-auto h-60 border-l-4 border-b-4 border-cyan-500 rounded-xl"
                    src="IT-course(2).jpg" alt="Second IT Course Image" />
                </figure>

                <figure className="md:hidden block my-5">
                    <img
                    className="w-full border-r-4 border-t-4 border-amber-500 rounded-xl"
                    src="IT-course(1).jpg" alt="First IT Course Image" />
                </figure>

                <figure className="md:hidden block">
                    <img
                    className="w-full border-l-4 border-b-4 border-cyan-500 rounded-xl"
                    src="IT-course(2).jpg" alt="Second IT Course Image" />
                </figure>
            </div>

            <div className="flex-1 space-y-6">
                <h2 className="lg:text-5xl md:text-4xl text-3xl md:text-left text-center font-extrabold">Choose Your Favorite Course & Apply</h2>
                <p className="text-gray-600 font-medium md:text-left text-center">Information Technology(IT) is the most powerful thing in the world. Peoples want to get IT jobs as their profession and it is their dream job. But, IT has many different jobs such as Web Development, Web Design, Digital Marketing, Graphics Design and more. These are popular or well known courses for all.</p>

                <Link to="/allCourses">
                <button className="md:w-3/12 w-full mt-8 btn btn-secondary rounded-full text-white text-lg font-bold">Find Now</button>
                </Link>
            </div>
        </div>
      </div>
    );
};

export default Banner;