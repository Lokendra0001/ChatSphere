import React, { useState } from "react";
import { Input, Button } from "../Index.jsx";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/authService.js";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { PurpleCanva } from "../Index.jsx";
import { GoalIcon, MessageCircleCode } from "lucide-react";
import googleIcon from "../../assests/googleicon.svg";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const submit = async (data) => {
    const session = await authService.loginAccount(data);
    if (session) {
      const user = await authService.getCurrentUser();
      if (user) {
        dispatch(addUser(user));
        navigate("/");
      }
    } else setErr("Invalid Username or password. Try again!");
  };

  const handleGoogleLogin = async () => {
    const session = await authService.googleLogin();
    if (session) {
      const user = await authService.getCurrentUser();
      if (user) dispatch(addUser(user));
    } else {
      setTimeout(() => setErr("Google Login Failed Try Again!"), 5000);
    }
  };

  return (
    <PurpleCanva>
      <div className="max-w-[1200px] md:w-[900px]  mx-auto md:bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row bg-indigo-800/80 ">
        {/* Left side - Welcome Image */}
        <div className="flex md:w-1/2 py-3 relative items-center justify-center  md:rounded-none">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1487&q=80')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-700/80 to-indigo-800/80" />
          <div className="relative z-10 text-center max-w-md px-6 ">
            <div className="mb-8">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-3 tracking-tight text-white">
                Welcome Back
              </h2>
              <p className="text-white/85 font-light">
                Sign in to access your personalized dashboard
              </p>
            </div>
            <div className="pt-4 border-t border-white/15">
              <p className="text-white/75 text-sm mb-3">NEW TO OUR PLATFORM?</p>
              <Link
                to="/signup"
                className="inline-block px-5 py-2.5 text-sm text-white font-medium border border-white/30 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-6  bg-white rounded-t-4xl flex flex-col justify-center">
          <div className="text-center mb-7 flex flex-col">
            <div className="inline-flex items-center justify-center gap-2  ">
              <MessageCircleCode className="h-7 w-7 text-purple-600 animate-pulse" />
              <h1 className="md:text-4xl font-extrabold bg-gradient-to-r from-purple-700 via-purple-500 to-purple-500 bg-clip-text text-transparent tracking-tight text-[30px] mb-1">
                ChatSphere
              </h1>
            </div>
            <div className="relative inline-block">
              <p className="relative z-10 text-gray-600 text-sm  font-medium px-4 py-1.5">
                Enter your credentials to continue your journey
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-5">
            {err && (
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-lg opacity-10"></div>
                <div className="relative flex items-center p-2  text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
                  <svg
                    className="w-5 h-5 mr-2 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="font-medium">{err}</span>
                  <button
                    onClick={() => setErr(null)}
                    className="ml-auto text-red-600 hover:text-red-800"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
            <div>
              <Input
                type="email"
                label="Email :"
                placeholder="Enter your email"
                className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="password"
                label="Password :"
                placeholder="Enter your password"
                className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                />
                <span className="ml-2">Remember me</span>
              </label>
            </div>

            <Button
              name="Sign In"
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2.5 font-semibold rounded-sm shadow-sm focus:ring-2 focus:ring-purple-500 cursor-pointer"
            />

            <div className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer"
              >
                Signup
              </Link>
            </div>
          </form>

          <Button
            onClick={handleGoogleLogin}
            className="text-purple-500 bg-slate-50 py-2 mt-1.5 font-semibold rounded-md border border-purple-700 
            cursor-pointer flex justify-center items-center gap-2 hover:bg-purple-200/75"
          >
            <img src={googleIcon} alt="googleIcon" width={20} />
            Login With Google
          </Button>
        </div>
      </div>
    </PurpleCanva>
  );
}

export default Login;
