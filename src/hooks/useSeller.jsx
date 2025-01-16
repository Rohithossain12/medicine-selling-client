import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useSeller = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isSeller, isPending: isSellerLoading } = useQuery({
    queryKey: [user?.email, "isSeller"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/seller/${user?.email}`);
      return res.data?.seller;
    },
  });
  return [isSeller, isSellerLoading];
};

export default useSeller;
