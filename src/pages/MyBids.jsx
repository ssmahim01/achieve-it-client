import { useEffect, useState } from "react";
import BidTableRow from "../components/BidTableRow";
import useAuth from "../context/useAuth";
import useAxiosSecure from "../context/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  // console.log(bids);
  const { user } = useAuth();
  const secureAxios = useAxiosSecure();

  const fetchBids = async () => {
    const { data } = await secureAxios.get(`/my-bids/${user?.email}`, {
      withCredentials: true,
    });
    setBids(data);
  };

  useEffect(() => {
    fetchBids();
  }, [user?.email]);

  const handleStatus = async (id, previous, status) => {
    if (previous !== "In Progress")
      return toast.error("Not Allowed", { position: "top-center" });
    try {
      await secureAxios.patch(`/bid-status/${id}`, { status });
      fetchBids();

      Swal.fire({
        position: "center",
        icon: "success",
        title: `Status has changed to ${status}`,
        showConfirmButton: false,
        timer: 3000,
      });

    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <section className="container px-5 mx-auto mt-12 pb-16">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800">My Bids</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {bids.length} Bid
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
                    <BidTableRow
                      handleStatus={handleStatus}
                      key={bid._id}
                      bid={bid}
                    />
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

export default MyBids;
