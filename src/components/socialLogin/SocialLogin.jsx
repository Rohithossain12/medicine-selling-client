import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const axiosPublic = useAxiosPublic();
  const { signInWithGoogle, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Prepare user data
      const userData = {
        name: user?.displayName,
        photo: user?.photoURL,
        role: "user", // Default role
        email: user?.email,
      };
      // Send user data to the backend
      await axiosPublic.post("/users", userData);
      toast.success(`Welcome, ${user.displayName}!`);
      navigate("/");
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-5">
      <button
        onClick={handleGoogleLogin}
        className="btn w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
      >
        <p>
          <FaGoogle></FaGoogle>
        </p>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
