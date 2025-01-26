import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  // Fetch users
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data; // Assuming the backend returns an array of users
    },
  });

  // Update user role
  const handleRoleChange = async (id, newRole) => {
    try {
      const response = await axiosSecure.patch(`/users/${id}`, {
        role: newRole,
      });

      if (response.status === 200) {
        toast.success("Role updated successfully!");
        refetch(); // Refresh the user list
      } else {
        toast.error("Failed to update role");
      }
    } catch (error) {
      if (error.isAxiosError) {
        // Axios error (can check if error.response is defined)
        if (error.response) {
          toast.error(
            error.response.data.message ||
              "Failed to update role. Please try again."
          );
        } else {
          toast.error(
            "Failed to update role. Please check your network and try again."
          );
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>PharmaWorld | Manage User</title>
      </Helmet>
      <h2 className=" text-xl lg:text-3xl text-blue-600 md:text-2xl font-bold mb-4">Manage Users</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user?._id}>
              <td className="border border-gray-300 p-2">{user?.name}</td>
              <td className="border border-gray-300 p-2">{user?.email}</td>
              <td className="border border-gray-300 p-2">{user?.role}</td>
              <td className="border border-gray-300 p-2">
                <select
                  value={user?.role}
                  onChange={(e) => handleRoleChange(user?._id, e.target.value)}
                  className="border border-gray-300 p-1 rounded"
                >
                  <option value="user">user</option>
                  <option value="seller">seller</option>
                  <option value="admin">admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
