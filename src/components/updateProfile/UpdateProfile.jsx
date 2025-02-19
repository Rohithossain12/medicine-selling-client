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
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const axiosSecure = useAxiosSecure();

  const email = user?.email;

  useEffect(() => {
    axiosSecure
      .get(`/users/${email}`)
      .then((res) => setUserData(res.data))
      .catch(console.error);
  }, [email, axiosSecure]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userProfileUpdate(name, photoURL);
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
      response.data.message
        ? toast.success("Profile updated successfully!")
        : toast.error("Failed to update profile.");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-10 p-6 bg-gray-100 shadow-lg rounded-xl ">
      <Helmet>
        <title>PharmaWorld | Update Profile</title>
      </Helmet>
      <div className="relative flex flex-col items-center">
        <img
          className="h-24 w-24 rounded-full border-4 border-green-500"
          src={user?.photoURL}
          alt="Profile"
        />
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          {user?.displayName}
        </h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-gray-500 font-bold">Role</p>
          <h3 className="text-lg font-medium">{userData?.role}</h3>
        </div>
        <div>
          <p className="text-gray-500 font-bold">User ID</p>
          <p>{user?.uid}</p>
        </div>
        <div>
          <p className="text-gray-500 font-bold">Contact</p>
          <p>{userData?.contact || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-500 font-bold">Address</p>
          <p>{userData?.address || "N/A"}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Update Profile
        </button>
        <button
          onClick={() => changePassword(auth, user?.email)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Change Password
        </button>
      </div>
      {isModalOpen && (
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Update Profile
            </h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <input
                type="text"
                defaultValue={userData?.name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                defaultValue={userData?.photo}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Photo URL"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                defaultValue={userData?.contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Contact"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                defaultValue={userData?.address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
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
