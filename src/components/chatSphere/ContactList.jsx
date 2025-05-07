import React, { useEffect, useState } from "react";
import authService from "../../appwrite/authService";
import { User, MoreVertical, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ContactList({ onSelectt }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const users = await authService.getContactList();
    if (users) {
      const filtered = users.documents.filter(
        (user) => user.$id !== userData.$id
      );
      setUsers(filtered);
      setFilteredUsers(filtered);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter((user) =>
      user.contact_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative flex w-full border border-gray-300 rounded-md  bg-white px-2">
          <div className=" inset-y-0 right-2  flex items-center pointer-events-none order-2">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pr-3 py-2 outline-none sm:text-sm"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="divide-y divide-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto cursor-pointer ">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.$id}
              className="p-4 hover:bg-gray-50 transition-colors duration-200 flex items-center"
              onClick={() => {
                onSelectt(user);
                navigate("/");
              }}
            >
              {/* Avatar */}
              <div className="relative">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.contact_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-800 font-medium text-lg">
                      {user.contact_name?.slice(0, 1).toUpperCase() || <User />}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* Contact Info */}
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-gray-900">
                  {user.contact_name.slice(0, 1).toUpperCase() +
                    user.contact_name.slice(1)}
                </h3>
                <p className="text-sm text-gray-500">Online</p>
              </div>

              {/* Actions */}
              <button
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle menu click
                }}
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            {searchTerm
              ? "No matching contacts found"
              : "No contacts available"}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactList;
