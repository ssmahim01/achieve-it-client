import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import { compareAsc, format } from "date-fns";
import DatePicker from "react-datepicker";
import { useState } from "react";
import Swal from "sweetalert2";

const CourseDetails = () => {
  const data = useLoaderData();
  // console.log(data);
  const { _id, category, deadline, course_title, poster, price, description } =
    data || {};
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const courseId = _id;
    const email = user?.email;
    const price = event.target.price.value;
    const comment = event.target.comment.value;
    const posterEmail = poster?.email;

    if (user?.email === poster?.email) {
      return Swal.fire({
        title: "Error!",
        text: "Permission not available",
        icon: "error",
      });
    }

    if (price >= price?.max_price) {
      return Swal.fire({
        title: "Error!",
        text: "At least equal to maximum price",
        icon: "error",
      });
    }

    if (compareAsc(new Date(), new Date(deadline)) === 1) {
      return Swal.fire({
        title: "Error!",
        text: "Deadline crossed",
        icon: "error",
      });
    }

    if (compareAsc(new Date(startDate), new Date(deadline)) === 1) {
      return Swal.fire({
        title: "Error!",
        text: "Provide a date within deadline",
        icon: "error",
      });
    }

    const newBid = {
      courseId,
      course_title,
      category,
      deadline: startDate,
      email,
      price,
      comment,
      posterEmail,
      status: "Pending",
    };

    fetch(`${import.meta.env.VITE_API_URL}/add-bid`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((bidData) => {
        if (bidData.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Bid has successful",
            showConfirmButton: false,
            timer: 2500,
          });
        }

        event.target.reset();
        navigate("/my-bids");
      });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto my-10 lg:px-0 md:px-6">
      {/* Job Details */}
      <div className="flex-1  px-4 py-7 bg-white rounded-md border border-gray-200 shadow-sm md:min-h-[350px]">
        <div className="flex items-center justify-between">
          {deadline && (
            <span className="text-sm font-light text-gray-800 ">
              Deadline: {format(new Date(deadline), "P")}
            </span>
          )}
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
            {category}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
            {course_title}
          </h1>

          <p className="mt-2 text-lg text-gray-600 ">{description}</p>
          <p className="mt-6 text-sm font-bold text-gray-600 ">
            Poster Details:
          </p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm  text-gray-600 ">
                Name: {poster?.name}
              </p>
              <p className="mt-2 text-sm  text-gray-600 ">
                Email: {poster?.email}
              </p>
            </div>
            <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              <img referrerPolicy="no-referrer" src={poster?.photo} alt="" />
            </div>
          </div>
          <p className="mt-6 text-lg font-bold text-gray-600 ">
            Range: ${price?.min_price} - ${price?.max_price}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className="p-6 w-full border border-gray-200 bg-white rounded-md shadow-sm flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Place A Bid
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="number"
                name="price"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                disabled
                defaultValue={user?.email}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="comment">
                Comment
              </label>
              <input
                id="comment"
                name="comment"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CourseDetails;
