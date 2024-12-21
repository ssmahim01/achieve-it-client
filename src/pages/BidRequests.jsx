import { format } from "date-fns";
import { useEffect, useState } from "react";
import useAxiosSecure from "../context/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../context/useAuth";

const BidRequests = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState([]);
  // console.log(bids);
  const secureAxios = useAxiosSecure();

  const fetchAllBids = async () => {
    const { data } = await secureAxios.get(`/bids?posterEmail=${user?.email}`, {
      withCredentials: true,
    });
    setBids(data);
  };

  useEffect(() => {
    fetchAllBids();
  }, [user?.email]);

  const handleStatus = async (id, prev, status) => {
    if (prev === status || prev === "Completed") {
      return toast.error("Not Allowed Now");
    }

    const { data } = await secureAxios.patch(
      `${import.meta.env.VITE_API_URL}/bid-status/${id}`,
      { status }
    );

    // console.log(data);

    toast.success(`Bid status is ${status}`, { position: "top-center" });

    fetchAllBids();
  };

  return (
    <section className="container px-5 mx-auto mt-12 pb-16">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800">Bid Requests</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {bids.length} Requests
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Title</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Email</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Deadline</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Price</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Category
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Status
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {bids.map((bid) => (
                    <tr key={bid._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {bid?.course_title}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {bid?.email}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {format(new Date(bid?.deadline), "P")}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        ${bid?.price}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <p
                            className={`px-3 py-1  ${
                              bid?.category === "Web Development" &&
                              "text-blue-500 bg-blue-100/60"
                            } ${
                              bid?.category === "Graphics Design" &&
                              "text-green-500 bg-green-100/60"
                            }
                            ${
                              bid?.category === "Digital Marketing" &&
                              "text-red-500 bg-red-100/60"
                            } text-xs  rounded-full`}
                          >
                            {bid?.category}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                            bid?.status === "Pending" &&
                            "bg-yellow-100/60 text-yellow-500"
                          } ${
                            bid?.status === "In Progress" &&
                            "bg-blue-100/60 text-blue-500"
                          } ${
                            bid?.status === "Completed" &&
                            "bg-lime-100/60 text-lime-500"
                          } ${
                            bid?.status === "Rejected" &&
                            "bg-rose-100/60 text-rose-500"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              bid?.status === "Pending" && "bg-yellow-500"
                            } ${
                              bid?.status === "In Progress" && "bg-blue-500"
                            } ${
                              bid?.status === "Completed" && "bg-green-500"
                            } ${bid?.status === "Rejected" && "bg-rose-500"}`}
                          ></span>
                          <h2 className="text-sm font-normal ">
                            {bid?.status}
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          {/* Accept Button */}
                          <button
                            disabled={
                              bid?.status === "In Progress" ||
                              bid?.status === "Completed"
                            }
                            onClick={() =>
                              handleStatus(bid?._id, bid?.status, "In Progress")
                            }
                            className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                              />
                            </svg>
                          </button>

                          {/* Reject Button */}
                          <button
                            disabled={
                              bid?.status === "Rejected" ||
                              bid?.status === "Completed"
                            }
                            onClick={() =>
                              handleStatus(bid?._id, bid?.status, "Rejected")
                            }
                            className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BidRequests;
