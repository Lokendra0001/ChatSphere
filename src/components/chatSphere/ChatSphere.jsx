import React, { useState } from "react";
import { Container } from "../Index";
import ChatBox from "./ChatBox";
import ContactList from "./ContactList";
import {
  MessageCircle,
  Menu,
  LogOutIcon,
  MessageCircleCode,
} from "lucide-react";
import authService from "../../appwrite/authService";
import { useNavigate } from "react-router-dom";

function ChatSphere() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const userOut = await authService.logoutAccount();
    if (userOut) navigate("/login");
  };

  return (
    <Container className="w-full h-screen bg-slate-50">
      <div className="flex h-full overflow-hidden relative">
        {/* Toggle Button - for small screens */}
        <button
          className={`absolute top-4 right-4 z-50 sm:hidden p-1 text-purple-600 rounded transition-all duration-300 ${
            isSidebarOpen ? "right-74 shadow bg-white" : "right-4"
          }`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Sidebar - responsive position */}
        <div
          className={`fixed sm:relative top-0 h-full w-74 sm:74 bg-white border-slate-200 z-40 transition-transform duration-300 transform 
            ${isSidebarOpen ? "translate-x-0 " : "translate-x-full"} 
            sm:translate-x-0 
            sm:flex sm:flex-col sm:border-r 
            right-0 sm:right-auto sm:left-0 sm:static
          `}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-purple-700 to-indigo-600 text-white flex justify-between items-center backdrop-blur-sm">
            {/* Logo & Branding (with floating animation) */}
            <div className="flex items-center gap-2  transition-all duration-300 hover:-translate-y-0.5">
              <MessageCircleCode className="w-6 h-6 text-purple-200 animate-pulse duration-1500" />
              <h1 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-100 to-cyan-200 tracking-tight drop-shadow-md pointer-events-none">
                ChatSphere
              </h1>
            </div>

            {/* Logout Button (with smooth glow) */}
            <button
              onClick={handleLogout}
              className="group p-1 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 hover:from-purple-600/40 hover:to-indigo-600/40 transition-all duration-300 shadow-sm hover:shadow-purple-500/30 cursor-pointer"
              title="Log Out"
            >
              <LogOutIcon className="w-5 h-5 text-gray-200 group-hover:text-white group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto ">
            <ContactList
              onSelectt={(user) => {
                setSelectedUser(user);
                setIsSidebarOpen(false); // close on mobile
              }}
            />
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-slate-50 z-10">
          <ChatBox user={selectedUser} />
        </div>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 backdrop-blur-xs bg-opacity-30 z-30 sm:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </Container>
  );
}

export default ChatSphere;
