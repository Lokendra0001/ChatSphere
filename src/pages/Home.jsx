import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChatSphere } from "../components/Index";
import { MessageCircle, LogIn, UserPlus } from "lucide-react";
import authService from "../appwrite/authService";
import { addUser } from "../store/authSlice";

function Home() {
  const dispatch = useDispatch();
  const [loading, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
    const fetchuser = async () => {
      const user = await authService.getCurrentUser();
      if (user) dispatch(addUser(user));
      setInterval(() => setLoader(false), 1000);
    };

    fetchuser();
  }, []);
  const user = useSelector((state) => state.auth.userData);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {loading ? (
        <div className="h-[100dvh] flex items-center justify-center">
          <div className="relative">
            {/* Animated circles */}
            <div className="w-20 h-20 rounded-full bg-purple-100/50 dark:bg-purple-800/50 absolute animate-ping"></div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 dark:from-purple-700 dark:to-indigo-700 flex items-center justify-center relative z-10">
              <MessageCircle className="w-8 h-8 text-white animate-pulse" />
            </div>

            {/* Floating dots */}
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-purple-300 dark:bg-purple-700 animate-bounce"></div>
            <div
              className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-indigo-300 dark:bg-indigo-700 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      ) : user ? (
        <ChatSphere />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] p-6">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden p-8 text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-700 flex items-center justify-center mb-6">
              <MessageCircle className="w-10 h-10 text-purple-600 dark:text-purple-300" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              Welcome to ChatSphere
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              Connect with friends and colleagues in real-time
            </p>

            <div className="space-y-4">
              <Link
                to="/login"
                className="flex items-center justify-center space-x-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition"
              >
                <LogIn className="w-5 h-5" />
                <span>Login to Your Account</span>
              </Link>

              <Link
                to="/signup"
                className="flex items-center justify-center space-x-2 w-full border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-gray-800 font-medium py-3 px-4 rounded-lg transition"
              >
                <UserPlus className="w-5 h-5" />
                <span>Create New Account</span>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                By continuing, you agree to our{" "}
                <a
                  href="#"
                  className="text-purple-600 hover:underline dark:text-purple-400"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-purple-600 hover:underline dark:text-purple-400"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
