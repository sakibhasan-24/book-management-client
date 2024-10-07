import axios from "axios";

export default function useApiCall() {
  const axiosPublic = axios.create({
    // baseURL: "http://localhost:5173",
    baseURL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : "https://book-exchange-server.vercel.app",
    withCredentials: true,
  });

  return axiosPublic;
}
