import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetAllUsers from "../../../hooks/user/useGetAllUsers";
import useDeliveryMan from "../../../hooks/user/useDeliveryMan";
import { toast } from "react-toastify";
// import { Toast } from "flowbite-react";

export default function ApplyForDelivery() {
  const { id } = useParams();
  const { loading, getUserById } = useGetAllUsers();
  const [user, setUser] = useState({});

  const { deliveryMan, applyForDelivery } = useDeliveryMan();
  const [formData, setFormData] = useState({
    deliveryManAddress: "",
    phoneNumber: "",
    preferredArea: "",
    availability: "",
    vehicleInfo: "",
    experience: "",
    additionalNotes: "",
  });
  useEffect(() => {
    // getUserById(id)
    const fetchUser = async (id) => {
      const res = await getUserById(id);
      console.log(res);
      setUser(res.user);
    };
    if (id) fetchUser(id);
  }, [id]);
  //   let formData = new FormData();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "formDar");
    try {
      const res = await applyForDelivery(id, formData);
      if (res.success) {
        toast.success("Successfully Applied");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  console.log(formData);

  //   console.log(user.isAdmin);
  if (user.isDeliveryPersonApplied)
    return (
      <div className="flex flex-col items-center justify-center gap-6 text-2xl font-bold text-blue-500 p-4">
        <h1>You Already Applied....</h1>
        <h1>Wait for Admin Approval</h1>
      </div>
    );
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Apply to be a Delivery Person</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border focus:outline-none rounded-md"
            value={user.userName}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border focus:outline-none rounded-md"
            readOnly
            value={user?.userEmail}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            value={formData.phoneNumber}
            className="w-full px-3 py-2 border focus:outline-none rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Address</label>
          <input
            type="text"
            onChange={(e) =>
              setFormData({
                ...formData,
                deliveryManAddress: e.target.value,
              })
            }
            value={formData.deliveryManAddress}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Preferred Delivery Area
          </label>
          <select
            onChange={(e) =>
              setFormData({ ...formData, preferredArea: e.target.value })
            }
            value={formData.preferredArea}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select an option</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chittagong">Chittagong</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Khulna">Khulna</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Availability
          </label>
          <select
            onChange={(e) =>
              setFormData({ ...formData, availability: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            value={formData.availability}
            required
          >
            <option value="">Select availability</option>
            <option value="Monday_to_Friday, 9 AM to 5 PM">
              Monday to Friday, 9 AM to 5 PM
            </option>
            <option value="Flexible, available on weekends">
              Flexible, available on weekends
            </option>
            <option value="Night shifts only">Night shifts only</option>
            <option value="Other">Other (specify in additional notes)</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Vehicle Information
          </label>
          <select
            onChange={(e) =>
              setFormData({ ...formData, vehicleInfo: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            value={formData.vehicleInfo}
            required
          >
            <option value="">Select vehicle information</option>
            <option value="Bike">Bike</option>
            <option value="None">None</option>
            <option value="Car">Car</option>
            <option value="Scooter">Scooter</option>
            <option value="Other">Other (specify in additional notes)</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Experience
          </label>
          <select
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
            value={formData.experience}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select Your Experience (Year)</option>
            <option value="0">0</option>
            <option value="0-1">0-1</option>
            <option value="1-3">1-3</option>
            <option value="More">More</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Additional Notes
          </label>
          <textarea
            onChange={(e) =>
              setFormData({ ...formData, additionalNotes: e.target.value })
            }
            value={formData.additionalNotes}
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
