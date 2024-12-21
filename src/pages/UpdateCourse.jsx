import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../context/useAuth";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import axios from "axios";

const UpdateCourse = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const [course, setCourse] = useState({});
    // console.log(course?.category);
    const { course_title, price, category, description } = course || {};
    const [startDate, setStartDate] = useState(new Date());
    const [categoryData, setCategoryData] = useState(category);
    // console.log(categoryData);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/course/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setStartDate(new Date(data.deadline));
      });
  }, [id]);


  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formInfo = Object.fromEntries(formData.entries());

    const poster = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    };

    const { min_price, max_price, ...updateForm } = formInfo;
    updateForm.price = { min_price, max_price };
    updateForm.poster = poster;
    updateForm.bidCount = 0;

    // const form = e.target;
    // const course_title = form.course_title.value;
    // const email = form.email.value;
    // const deadline = startDate;
    // const price = {
    //   min_price: form.min_price.value,
    //   max_price: form.max_price.value,
    // };
    // const description = form.description.value;

    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/update-course/${id}`,
      updateForm
    );

    if (data.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully updated the course",
        showConfirmButton: false,
        timer: 2500,
      });

      navigate("/my-posted-courses");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="lg:w-1/2 md:w-4/5 w-11/12 p-2 md:p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-xl font-bold text-gray-700 capitalize">
          Update the Course
        </h2>

        <form onSubmit={handleUpdateCourse}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="job_title">
                Course Title
              </label>
              <input
                id="course_title"
                name="course_title"
                defaultValue={course_title}
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
              <label className="text-gray-700" htmlFor="category">
                Category
              </label>
              <select
                name="category"
                id="category"
                value={categoryData || course?.category}
                onChange={(e) => setCategoryData(e.target.value)}
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
                defaultValue={price?.min_price}
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
                defaultValue={price?.max_price}
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
              defaultValue={description}
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="disabled:cursor-not-allowed px-8 py-3 leading-5 text-white transition-colors duration-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Update Course
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateCourse;
