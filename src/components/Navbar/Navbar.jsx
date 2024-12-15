import { Link } from "react-router-dom";
import logoAchieveIt from "../../assets/images/logo.png";
import useAuth from "../../context/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
    const {user, logOut} = useAuth();

    const logOutUser = () => {
        logOut()
        .then(() => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Log Out successfully",
                showConfirmButton: false,
                timer: 2500
              });
        })
    };

  return (
    <div className="navbar bg-base-100 shadow-md container px-4 mx-auto fixed z-10">
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-auto h-12" src={logoAchieveIt} alt="Achieve IT Logo" />
          <span className="md:text-xl font-bold">Achieve IT</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/allCourses">All Courses</Link>
          </li>

          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>

        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/add-course" className="justify-between">
                  Add Course
                </Link>
              </li>
              <li>
                <Link to="/my-posted-courses">My Posted Courses</Link>
              </li>
              <li>
                <Link to="/my-bids">My Bids</Link>
              </li>
              <li>
                <Link to="/bid-requests">Bid Requests</Link>
              </li>
              <li className="mt-2">
                <button
                  onClick={logOutUser}
                  className="bg-rose-500 pb-2 text-white font-medium block text-center"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;