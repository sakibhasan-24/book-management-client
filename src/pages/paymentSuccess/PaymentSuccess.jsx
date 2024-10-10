import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import useApiCall from "../../apicall/publicApi/useApiCall"; // Adjust import based on your project structure

const PaymentSuccess = () => {
  const navigate = useNavigate(); // Use useNavigate hook instead
  const axiosPublic = useApiCall();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tran_id = queryParams.get("tran_id");

    if (tran_id) {
      // Call your backend to confirm the payment and update the order status
      confirmPayment(tran_id);
    }
  }, []);

  const confirmPayment = async (tran_id) => {
    try {
      // Call the backend to handle the payment confirmation
      const res = await axiosPublic.put(
        `/api/order/success?tran_id=${tran_id}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);

      if (res?.data?.success) {
        // Redirect to a success page or show a success message
        alert("Payment successful! Your order has been confirmed.");
        navigate("/order/success"); // Use navigate to redirect
      } else {
        alert("Payment failed. Please try again.");
        navigate("/"); // Redirect to home or appropriate page
      }
    } catch (error) {
      console.log("Error confirming payment:", error);
      alert("An error occurred while confirming payment. Please try again.");
      navigate("/"); // Redirect to home or appropriate page
    }
  };

  return <div>Loading...</div>; // Or a spinner/loading animation
};

export default PaymentSuccess;
