import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Lottie from "react-lottie-player";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import animationData from "../../assets/Animation - 1736878783061.json";
import SocialLogin from "../../components/socialLogin/SocialLogin";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, setLoading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await login(data.email, data.password);

      // Assuming result contains the user object after successful login
      const user = result.user;

      // Show a success toast with the user's display name
      toast.success(`Welcome, ${user.displayName || user.email}!`);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-blue-50 px-4 py-10">
      <Helmet>
        <title>PharmaWorld | Login</title>
      </Helmet>
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Animation Section */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-blue-100 p-6">
          <Lottie
            loop
            animationData={animationData}
            play
            className="w-full max-w-sm"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 w-full flex flex-col justify-center px-8 py-12">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Log In to Your Account
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            autoComplete="off"
          >
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
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-400 transition"
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
                placeholder="Enter your password"
                className="input input-bordered w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-400 transition"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Social Login */}
          <SocialLogin />

          {/* Redirect to Register */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
