import axios from "axios";

export default function useApiCall() {
  const axiosPublic = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });
  return axiosPublic;
}
