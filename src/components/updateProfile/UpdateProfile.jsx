import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import auth from "../../firebase/firebase.config";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateProfile = () => {
  const { user, userProfileUpdate, changePassword } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Function to handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Step 1: Update Firebase profile
      await userProfileUpdate(name, photoURL);

      // Step 2: Update database for the specific user
      const payload = {
        email: user?.email,
        name,
        photo: photoURL,
      };

      const response = await axiosSecure.put(
        `/user/updateProfile/${user?.email}`,
        payload
      );
      console.log(response);
      if (response.data.message) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden">
      {/* Banner Image */}
      <div className="h-32 bg-green-200 flex justify-center items-center">
        <img
          className="h-20 w-20 rounded-full border-4 border-white -mt-4"
          src={user?.photoURL}
          alt="Profile"
        />
      </div>

      {/* Profile Info */}
      <div className="text-center px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">CUSTOMER</h2>
        <p className="text-gray-500 mt-2 text-sm">User Id: {user?.uid}</p>

        <div className="mt-4">
          <p className="text-lg font-medium text-gray-900">Name</p>
          <p className="text-gray-600">{user?.displayName}</p>
        </div>

        <div className="mt-4">
          <p className="text-lg font-medium text-gray-900">Email</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 flex justify-between">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={() => setIsModalOpen(true)}
        >
          Update Profile
        </button>
        <button
          onClick={() => changePassword(auth, user?.email)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Change Password
        </button>
      </div>

      {/* Update Profile Modal */}
      {isModalOpen && (
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Update Profile
            </h3>
            <form onSubmit={handleUpdateProfile}>
              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              {/* Photo URL Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Photo URL
                </label>
                <input
                  type="text"
                  defaultValue={user?.photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="Enter your photo URL"
                  className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              {/* Email (Read-only) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="w-full border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-500"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`bg-green-500 text-white px-4 py-2 rounded-lg ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-green-600"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default UpdateProfile;
