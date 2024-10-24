import React, { useEffect, useState } from "react";
import useDeliveryMan from "../../../hooks/deliveryManActivities/useDeliveryMan";
import { useSelector } from "react-redux";
import Spinner from "../../loader/Spinner";
import { toast } from "react-toastify";

export default function AssignedOrders() {
  const { getAllDeliveryManProduct, updateOrder } = useDeliveryMan();
  const [deliveryManProducts, setDeliveryManProducts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  //   console.log(currentUser.user?._id);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllDeliveryManProduct(currentUser.user?._id);
      setDeliveryManProducts(data.products);
      //   console.log(data);
    };
    if (currentUser) {
      fetchData();
    }
  }, []);
  console.log(deliveryManProducts);
  if (deliveryManProducts.length === 0) {
    return (
      <div className="text-3xl text-center text-slate-700 my-12">
        <h1>Currently You Have No Orders To delivery</h1>
      </div>
    );
  }
  const handleUpdateOrderStatus = async (e, id) => {
    const deliveryStatus = e.target.value; // Get the selected status
    const res = await updateOrder(deliveryStatus, id); // Update the order

    if (res.data.success) {
      // Update the specific order in the state
      setDeliveryManProducts((prevProducts) =>
        prevProducts.map((order) =>
          order._id === id
            ? { ...order, deliveryStatus: deliveryStatus }
            : order
        )
      );
      toast.success(res.data.message);
    }
  };

  return (
    <div className="w-full sm:max-w-6xl mx-auto p-4  ">
      <h1 className="text-center font-bold text-2xl mb-4">
        All Orders For{" "}
        <span className="text-slate-600">{currentUser?.user?.userName}</span>
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <tr>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                No
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                Delivery Address
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                User Email
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                User Phone
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                Product
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-left">
                Status
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-center">
                Update
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {deliveryManProducts?.map((item, idx) => (
              <tr
                key={item._id}
                className="hover:bg-gray-100 border-b border-gray-200 transition duration-200"
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">{item?.deliveryAddress?.address}</td>
                <td className="py-3 px-4">{item?.deliveryAddress?.email}</td>
                <td className="py-3 px-4">{item?.deliveryAddress?.phone}</td>
                <td className="py-3 px-4">{item._id}</td>
                <td className="py-3 px-4">{item?.deliveryStatus}</td>

                {/* If deliveryStatus is "Delivered", show success message, otherwise show select dropdown */}
                {item?.deliveryStatus === "Delivered" ? (
                  <td className="py-3 px-4 text-green-600 font-bold text-center">
                    Success
                  </td>
                ) : (
                  <td className="py-3 px-4 text-center">
                    <div className="w-full">
                      <select
                        className="w-full py-2 px-3 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        defaultValue="Update"
                        onChange={(e) => handleUpdateOrderStatus(e, item._id)}
                      >
                        <option value="Update" disabled>
                          Update
                        </option>
                        <option value="Delivery Man Collect From Store">
                          Delivery Man Collect From Store
                        </option>
                        <option value="On the Way">On the Way</option>
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
