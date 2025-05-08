import React, { useState } from "react";
import { Input, Button } from "../Index.jsx";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/authService.js";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { PurpleCanva } from "../Index.jsx";
import { MessageCircleCode, UserPlus, ShieldCheck, Rocket } from "lucide-react";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (data) => {
    const session = await authService.createAccount(data);
    // console.log(session);
    if (session) {
      const user = await authService.getCurrentUser();
      if (user) {
        dispatch(addUser(user));
        navigate("/");
      }
    } else {
      setErr("Signup Failed. Please try again!");
    }
  };

  return (
    <PurpleCanva>
      <div className="max-w-[1200px] md:w-[900px] mx-auto md:bg-white dark:md:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row bg-indigo-800/80 dark:bg-gray-800">
        {/* Left side - Welcome Image */}
        <div className="flex md:w-1/2 py-10 relative items-center justify-center md:rounded-none">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/90 to-indigo-900/90" />
          <div className="relative z-10 text-center max-w-md px-6">
            <div className="mb-8">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 backdrop-blur-sm">
                <UserPlus className="h-8 w-8 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-bold mb-3 tracking-tight text-white">
                Join Our Community
              </h2>
              <p className="text-white/85 font-light">
                Create your account and start your journey with us
              </p>
            </div>

            <div className="space-y-4 text-left mb-8">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-purple-300 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  Secure and encrypted data protection
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Rocket className="h-5 w-5 text-purple-300 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  Instant access to all features
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15">
              <p className="text-white/75 text-sm mb-3">
                ALREADY HAVE AN ACCOUNT?
              </p>
              <Link
                to="/login"
                className="inline-block px-5 py-2.5 text-sm text-white font-medium border border-white/30 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-6 bg-white dark:bg-gray-800 rounded-t-4xl flex flex-col justify-center">
          <div className="text-center mb-7 flex flex-col">
            <div className="inline-flex items-center justify-center gap-2">
              <MessageCircleCode className="h-7 w-7 text-purple-600 animate-pulse" />
              <h1 className="md:text-4xl font-extrabold bg-gradient-to-r from-purple-700 via-purple-500 to-purple-500 bg-clip-text text-transparent tracking-tight text-[30px] mb-1">
                ChatSphere
              </h1>
            </div>
            <div className="relative inline-block">
              <p className="relative z-10 text-gray-600 dark:text-gray-300 text-sm font-medium px-4 py-1.5">
                Enter your credentials to continue your journey
              </p>
            </div>
          </div>

          {err && (
            <p className="text-red-600 bg-red-200 dark:bg-red-300/20 dark:text-red-400 w-full text-center py-2">
              {err}
            </p>
          )}

          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <Input
                type="text"
                label="Username :"
                placeholder="Enter Username"
                className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                {...register("name", {
                  required: "Username is required",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="email"
                label="Email :"
                placeholder="Enter your email"
                className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
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
                className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
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
              <label className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 border-gray-300 dark:border-gray-600 rounded"
                />
                <span className="ml-2">Remember me</span>
              </label>
            </div>

            <Button
              name="SignUp"
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 px-4 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
            />

            <div className="text-center text-sm text-slate-500 dark:text-slate-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                SignIn
              </Link>
            </div>
          </form>
        </div>
      </div>
    </PurpleCanva>
  );
}

export default Signup;
