import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";

const TabCategories = () => {
  const [courses, setCourses] = useState([]);
  // console.log(courses);

  const allCourses = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);

    setCourses(data);
  };

  useEffect(() => {
    allCourses();
  }, []);

  return (
    <Tabs>
      <div className="container px-6 py-10 mb-6 mx-auto">
        <h1 className="md:text-3xl text-2xl font-bold text-center text-gray-800 capitalize">
          Browse Courses By Categories
        </h1>

        <p className="max-w-2xl mx-auto mt-3 mb-8 text-center text-gray-500 ">
          Three categories available for the time being. They are Web
          Development, Graphics Design and Digital Marketing. Browse them by
          clicking on the tabs below.
        </p>
        <div className="flex items-center justify-center *:font-semibold">
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>
       
          <TabPanel>
            <div className="w-11/12 mx-auto grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.filter(course => course.category === "Web Development").map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="w-11/12 mx-auto grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.filter(course => course.category === "Graphics Design").map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="w-11/12 mx-auto grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.filter(course => course.category === "Digital Marketing").map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
            </div>
          </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;