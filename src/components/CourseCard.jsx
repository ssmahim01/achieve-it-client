import { Link } from "react-router-dom";

const CourseCard = ({course}) => {
  const {_id, course_title, deadline, category, description, price, bidCount} = course;

  // console.log(course);

    return (
        <Link
      to={`/course/${_id}`}
      className='p-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all'
    >
      <div className='flex items-center justify-between'>
        <span className='text-xs font-light text-gray-800 '>
          Deadline: {deadline}
        </span>
        <span className={`px-3 py-1 text-[8px] uppercase rounded-full ${category === "Web Development" && "text-blue-800 bg-blue-200"} ${category === "Graphics Design" && "text-lime-700 bg-lime-200"} ${category === "Digital Marketing" && "text-amber-700 bg-amber-200"}`}>
          {category}
        </span>
      </div>

      <div>
        <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
          {course_title}
        </h1>

        <p className='mt-2 text-sm text-gray-600 '>
          {description}
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>
          Range: ${price.min_price} - ${price.max_price}
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>Total Bids: {bidCount}</p>
      </div>
    </Link>
    );
};

export default CourseCard;