import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/socialLogin/SocialLogin";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import Lottie from "react-lottie-player";
import animationData from "../../assets/Animation - 1736873044775.json";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, userProfileUpdate, loading, setLoading } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Register the user
      const result = await createUser(data.email, data.password);
      console.log(result);

      // Update the user profile
      await userProfileUpdate(data.name, data.photoURL);

      // Prepare user data
      const userData = {
        name: data.name,
        photo: data.photoURL,
        role: "user",
        email: data.email,
        contact: data.contact, // New contact field
        address: data.address, // New address field
      };

      // Send user data to the backend
      await axiosPublic.post("/users", userData);
      toast.success("Registration successful!");
      reset();
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-blue-50 px-4 py-10">
      <Helmet>
        <title>PharmaWorld | Register</title>
      </Helmet>
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Form Section (Right side) */}
        <div className="md:w-1/2 w-full flex flex-col justify-center px-8 py-12">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Create an Account
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            autoComplete="off"
          >
            {/* Name Field */}
            <div className="form-control">
              <label className="label text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your name"
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-400 transition bg-white dark:bg-white"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Name is required.</p>
              )}
            </div>

            {/* Photo URL Field */}
            <div className="form-control">
              <label className="label text-sm font-medium text-gray-600">
                Photo URL
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="Enter photo URL"
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-400 transition bg-white dark:bg-white"
              />
              {errors.photoURL && (
                <p className="text-red-500 text-sm mt-1">
                  Photo URL is required.
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
                placeholder="Enter your email"
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-400 transition bg-white dark:bg-white"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.type === "required"
                    ? "Email is required."
                    : "Invalid email address."}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
                })}
                placeholder="Enter a strong password"
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-400 transition bg-white dark:bg-white"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.type === "required"
                    ? "Password is required."
                    : errors.password.type === "minLength"
                    ? "Password must be at least 6 characters."
                    : errors.password.type === "maxLength"
                    ? "Password must be less than 20 characters."
                    : "Password must include uppercase, lowercase, number, and special character."}
                </p>
              )}
            </div>

            {/* Contact Field */}
            <div className="form-control">
              <label className="label text-sm font-medium text-gray-600">
                Contact Number
              </label>
              <input
                type="text"
                {...register("contact", { required: true })}
                placeholder="Enter your contact number"
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-400 transition bg-white dark:bg-white"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">Contact is required.</p>
              )}
            </div>

            {/* Address Field */}
            <div className="form-control">
              <label className="label text-sm font-medium text-gray-600">
                Address
              </label>
              <textarea
                {...register("address", { required: true })}
                placeholder="Enter your address"
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-400 transition bg-white dark:bg-white"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">Address is required.</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          {/* Social Login */}
          <SocialLogin />

          {/* Redirect to Login */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Please Login
            </Link>
          </p>
        </div>

        {/* Animation Section (Left side) */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-blue-100 p-6">
          <Lottie
            loop
            animationData={animationData}
            play
            className="w-full max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
