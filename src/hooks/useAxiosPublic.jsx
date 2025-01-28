import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "medicine-selling-server-gamma.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

