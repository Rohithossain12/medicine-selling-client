import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import auth from "../../firebase/firebase.config";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const UpdateProfile = () => {
  const { user, userProfileUpdate, changePassword } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [contact, setContact] = useState(user?.contact || "");
  const [address, setAddress] = useState(user?.address || "");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const axiosSecure = useAxiosSecure();

  const email = user?.email;

  useEffect(() => {
    axiosSecure
      .get(`/users/${email}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [email, axiosSecure]);

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
        contact,
        address,
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
    <div className=" p-6 bg-gray-100 mt-10 mb-10 text-gray-800">
      <Helmet>
        <title>PharmaWorld | Update Profile</title>
      </Helmet>
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold">
          Welcome, {userData?.name || user?.displayName}
        </h2>
      </div>

      {/* Banner Image */}
      <div className="h-32 bg-green-200 flex justify-center items-center rounded-lg mb-6">
        <img
          className="h-20 w-20 rounded-full border-4 border-white -mt-10"
          src={user?.photoURL || "/default-avatar.png"}
          alt="Profile"
        />
      </div>

      
      {/* Profile Info */}
      <div className="text-center px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {userData?.role}
        </h2>
        <p className="text-gray-500 mt-2 text-sm">User Id: {user?.uid}</p>

        <div className="mt-4">
          <p className="text-lg font-medium text-gray-900">Name</p>
          <p className="text-gray-600">{user?.displayName}</p>
        </div>

        <div className="mt-4">
          <p className="text-lg font-medium text-gray-900">Contact</p>
          <p className="text-gray-600">{userData?.contact}</p>
        </div>
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-900">Address</p>
          <p className="text-gray-600">{userData?.address}</p>
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
                  className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 bg-white text-gray-800"
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
                  className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* Contact Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Contact
                </label>
                <input
                  type="text"
                  defaultValue={userData?.contact || ""}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter your contact number"
                  className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* Address Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Address
                </label>
                <input
                  type="text"
                  defaultValue={userData?.address || ""}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 bg-white text-gray-800"
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
                  className="w-full border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-800"
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
