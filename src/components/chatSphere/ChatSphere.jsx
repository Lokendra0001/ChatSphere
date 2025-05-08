import React, { useState } from "react";
import { Container } from "../Index";
import { ChatBox, ContactList } from "../Index";
import { Menu, LogOutIcon, MessageCircleCode } from "lucide-react";
import authService from "../../appwrite/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/authSlice";

function ChatSphere() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const userOut = await authService.logoutAccount();
    dispatch(removeUser());
    if (userOut) navigate("/login");
  };

  return (
    <Container className="w-full h-[100dvh] bg-slate-50 dark:bg-gray-900">
      <div className="flex h-full overflow-hidden relative">
        {/* Toggle Button - for small screens */}
        <button
          className={`absolute top-4 right-4 z-40 sm:hidden p-1 text-purple-600 dark:text-white/80 rounded transition-all duration-300 ${
            isSidebarOpen ? "hidden" : "block "
          }`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
        {/* Sidebar - responsive position */}
        <div
          className={`fixed sm:relative top-0 h-full w-74 sm:74 bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 z-40 transition-transform duration-300 transform 
        ${isSidebarOpen ? "translate-x-0 " : "translate-x-full"} 
        sm:translate-x-0 
        sm:flex sm:flex-col sm:border-r 
        right-0 sm:right-auto sm:left-0 sm:static
      `}
        >
          {/* Header */}
          <div className="p-4 border-b shadow-sm dark:border-gray-600  from-indigo-600 to-purple-600  text-white flex justify-between items-center backdrop-blur-sm ">
            {/* Logo & Branding (with floating animation) */}
            <div className="flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5">
              <MessageCircleCode className="w-6 h-6 text-purple-800 dark:text-purple-500 animate-pulse duration-1500" />
              <h1 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-tr from-indigo-600 to-purple-600  dark:from-purple-500 dark:to-indigo-400 tracking-tight drop-shadow-md pointer-events-none">
                ChatSphere
              </h1>
            </div>
            <div className="flex gap-2">
              {/* Logout Button (with smooth glow) */}
              <button
                onClick={handleLogout}
                className="group p-1 rounded-full transition-all duration-300  cursor-pointer"
                title="Log Out"
              >
                <LogOutIcon className="w-5 h-5 text-gray-600 hover:text-gray-900  dark:text-gray-300 dark:group-hover:text-white group-hover:scale-110 transition-transform duration-200" />
              </button>

              {/* Toggle Button - for small screens */}
              <button
                className={` z-50 sm:hidden  text-purple-600 dark:text-white rounded transition-all duration-300 `}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          {/* Contact List */}
          <div className="flex-1 overflow-y-auto dark:bg-gray-800">
            <ContactList
              onSelectt={(user) => {
                setSelectedUser(user);
                setIsSidebarOpen(false); // close on mobile
              }}
            />
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-slate-50 dark:bg-gray-900 z-10">
          <ChatBox user={selectedUser} />
        </div>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 backdrop-brightness-50 bg-opacity-30 dark:bg-opacity-50 z-30 sm:hidden "
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </Container>
  );
}

export default ChatSphere;
