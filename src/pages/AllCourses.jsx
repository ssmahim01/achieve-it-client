import CourseCard from "../components/CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  // console.log(courses);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const handleResetAll = () => {
    setFilter("");
    setSearch("");
    setSort("");
  };

  useEffect(() => {
    const fetchAllCourses = async() => {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/all-courses?filter=${filter}&search=${search}&sort=${sort}`)
      setCourses(data)
    }

    fetchAllCourses()
  }, [filter, search, sort]);

  return (
    <div className="container px-12 py-14 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div>
        <div className="flex justify-center items-center gap-5 flex-wrap">
          <div>
            <select
              name="category"
              id="category"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border p-4 rounded-lg"
            >
              <option value="">Filter By Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphics Design">Graphics Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>

          <form>
            <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter Job Title"
                aria-label="Enter Job Title"
              />

              <button onClick={(e) => {
                e.preventDefault();
                {search};
              }} className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Search
              </button>
            </div>
          </form>
          <div>
            <select
              name="category"
              id="category"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border p-4 rounded-md"
            >
              <option value="">Sort By Deadline</option>
              <option value="dsc">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>
          </div>
          <button className="btn" onClick={handleResetAll}>Reset</button>
        </div>
        
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;