import React, { useState, useEffect } from "react";
import useCreateUser from "../../hooks/user/useCreateUser";
import { toast } from "react-toastify";
import useGetAllUsers from "../../hooks/user/useGetAllUsers";
import useApiCall from "../../apicall/publicApi/useApiCall";

// Component for creating a delivery man and displaying the list in a table
export default function DeliveryManLists() {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const { getAllDeliveryMan, loading: deliveryMenLoading } = useGetAllUsers();
  const axiosPublic = useApiCall();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllDeliveryMan();
      setDeliveryMen(res.deliveryMan);
    };
    fetchData();
  }, []);

  const { signUpUser, loading } = useCreateUser();
  const [formData, setFormData] = useState({
    role: "deliveryMan",
    userEmail: "",
    userName: "",
    userPassword: "",
    isDeliveryPerson: true,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signUpUser(formData);
      if (res.success) {
        setSuccessMessage("Delivery man created successfully!");
        setErrorMessage("");
        toast.success("Delivery man created successfully!");
        const res = await getAllDeliveryMan();
        setDeliveryMen(res.deliveryMan);
      } else {
        setErrorMessage(res.response.data.message);
        setSuccessMessage("");
        toast.error(res.response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSuccessMessage("");
      setErrorMessage("");
    }
  };
  const handleStatusChange = async (id, status) => {
    const isBlocked = status === "Blocked";
    const endpoint = isBlocked
      ? "/api/user/disabledDeliveryMan"
      : "/api/user/enableDeliveryMan";

    try {
      await axiosPublic.put(endpoint, { id });
      const res = await getAllDeliveryMan();
      setDeliveryMen(res.deliveryMan);
      toast.success(`Delivery man status updated to ${status}!`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update delivery man status.");
    }
  };

  return (
    <div className="w-full sm:max-w-4xl mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-lg rounded-lg p-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
            Insert Delivery Man Info
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-blue-600 mb-2">
                Name
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                className="border border-blue-300 rounded-lg w-full p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-blue-600 mb-2">
                Email
              </label>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                required
                className="border border-blue-300 rounded-lg w-full p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-blue-600 mb-2">
                Password
              </label>
              <input
                type="password"
                name="userPassword"
                value={formData.userPassword}
                onChange={handleChange}
                required
                className="border border-blue-300 rounded-lg w-full p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-blue-600 mb-2">
                Role
              </label>
              <input
                type="text"
                name="role"
                value="Delivery Man"
                readOnly
                className="bg-blue-50 border border-blue-300 rounded-lg w-full p-4 text-gray-600 cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              {loading ? "Creating..." : "Create Delivery Man"}
            </button>

            {successMessage && (
              <p className="text-center text-green-500 mt-4">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-center text-red-500 mt-4">{errorMessage}</p>
            )}
          </form>
        </div>

        {/* Table Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">
            Delivery Men List
          </h2>
          {deliveryMenLoading ? (
            <p>Loading delivery men...</p>
          ) : deliveryMen.length > 0 ? (
            <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
              <table className="table-auto w-full text-left border-collapse">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryMen.map((deliveryMan) => (
                    <tr
                      key={deliveryMan._id}
                      className="hover:bg-blue-50 border-t"
                    >
                      <td className="px-4 py-2">{deliveryMan.userName}</td>
                      <td className="px-4 py-2">{deliveryMan.userEmail}</td>
                      <td className="px-4 py-2">
                        <select
                          value={
                            deliveryMan.isRedAlert ? "Blocked" : "Available"
                          }
                          className={`border rounded-md p-2 ${
                            deliveryMan.isRedAlert
                              ? "bg-red-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                          onChange={(e) =>
                            handleStatusChange(deliveryMan._id, e.target.value)
                          }
                        >
                          <option value="Available">Active</option>
                          <option value="Blocked">Blocked</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No delivery men available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
