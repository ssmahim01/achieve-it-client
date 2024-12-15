import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../context/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const AddCourse = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();

  const handleAddCourse = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formInfo = Object.fromEntries(formData.entries());

    const poster = {
      email: user?.email,
      photo: user?.photoURL,
    };

    const { min_price, max_price, ...newForm } = formInfo;
    newForm.price = { min_price, max_price };
    newForm.poster = poster;
    newForm.bidCount = 0;

    // console.log(newForm);

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/add-course`,
      newForm
    );

    if (data.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully added the course",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="lg:w-1/2 md:w-4/5 w-11/12 p-2 md:p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-xl font-bold text-gray-700 capitalize">
          Add a Course
        </h2>

        <form onSubmit={handleAddCourse}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="job_title">
                Course Title
              </label>
              <input
                id="course_title"
                name="course_title"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                defaultValue={user?.email}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className="border p-2 rounded-md"
                name="deadline"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700 " htmlFor="category">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="border p-2 rounded-md"
              >
                <option value="Web Development">Web Development</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700 " htmlFor="min_price">
                Minimum Price
              </label>
              <input
                id="min_price"
                name="min_price"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="max_price">
                Maximum Price
              </label>
              <input
                id="max_price"
                name="max_price"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Description
            </label>
            <textarea
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              name="description"
              id="description"
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddCourse;
