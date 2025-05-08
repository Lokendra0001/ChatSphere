import React, { useEffect, useState, useRef } from "react";
import chatService from "../../appwrite/chatServices"; // Import the chatService
import {
  Send,
  Paperclip,
  Smile,
  MessageCircle,
  ChevronLeft,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../Index";
import { useSelector } from "react-redux";

function ChatBox({ user }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const userData = useSelector((state) => state.auth.userData);
  const messageEndRef = useRef(null);

  const scrollBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // This fetch data is use for the mounting message from db when comp. mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (!user || !userData?.$id) return;

      const msgs = await chatService.getMessages(85, 0);
      if (msgs && msgs.documents) {
        //Reciever and user
        //681c26cb000b1fca7465
        //681c2719002288031677
        //681c26cb000b1fca7465

        //Sender and userData
        //681c2719002288031677
        //681c2719002288031677
        const filteredMessages = msgs.documents.filter(
          (msg) =>
            (msg.sender_id === userData.$id &&
              msg.receiver_id === user.contact_id) ||
            (msg.sender_id === user.contact_id &&
              msg.receiver_id === userData.$id)
        );
        setMessages(filteredMessages);

        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };
    fetchData();
  }, [user, userData]);

  // This fetch data is use for the addding message and show in realtime
  useEffect(() => {
    const unsubscribe = chatService.subscribeToMessages((newMessage) => {
      const isRelevant =
        (newMessage.payload.sender_id === userData.$id &&
          newMessage.payload.receiver_id === user?.contact_id) ||
        (newMessage.payload.sender_id === user?.contact_id &&
          newMessage.payload.receiver_id === userData.$id);

      if (isRelevant) {
        setMessages((prev) => [...prev, newMessage.payload]);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.contact_id, userData.$id]);

  useEffect(() => {
    setTimeout(() => {
      scrollBottom();
    }, 200);
  }, [messages]);

  const submit = async (data) => {
    const msgSent = await chatService.createMessage(
      data.message,
      userData.$id,
      user?.contact_id,
      "text"
    );
    if (msgSent) reset();
  };

  const handleImgSend = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileUpload = await chatService.uploadImg(file);

    if (fileUpload) {
      const fileId = fileUpload.$id;
      if (fileId) {
        const msg = await chatService.createMessage(
          fileId,
          userData.$id,
          user?.contact_id,
          "image"
        );
        if (msg) console.log("Message Image sended");
        else console.log("Error occured try again");
      }
    }
  };

  return !user ? (
    <div className="h-[100dvh] w-full flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-indigo-200/50 blur-xl rounded-full animate-pulse"></div>
        <div className="relative w-24 h-24 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg animate-[float_4s_ease-in-out_infinite]">
          <MessageCircle className="w-12 h-12 text-white" strokeWidth={1.5} />
        </div>
      </div>

      <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 text-center leading-tight">
        Welcome to ChatSphere
      </h1>

      <p className="text-lg text-gray-600 mb-8 max-w-md text-center px-4">
        Select a contact or start a new conversation to begin your messaging
        experience
      </p>
      <p className="text-md text-gray-500 mb-8 max-w-md text-center px-4 animate-pulse">
        Sometimes the google Login User not shown in other device!
      </p>

      <div className="flex items-center gap-3 animate-bounce">
        <ChevronLeft className="w-5 h-5 text-purple-500" />
        <span className="text-sm font-medium text-purple-600">
          Choose from sidebar
        </span>
      </div>

      <div className="absolute bottom-8 flex items-center gap-2 text-sm text-gray-400">
        <Smile className="w-4 h-4" />
        <span>Your messages are end-to-end encrypted</span>
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Enhanced Header */}
      <div className="sticky top-0 flex items-center justify-between bg-white p-3 border-b border-gray-200 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium">
            {user.contact_name.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {user.contact_name.slice(0, 1).toUpperCase() +
                user.contact_name.slice(1)}
            </h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 overflow-y-auto py-1 pt-5 space-y-2 px-4 `}>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center space-y-3">
              {/* Typing indicator with smooth animation */}
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-[bounce_1s_infinite]"></div>
                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-[bounce_1s_infinite_0.2s]"></div>
                <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-[bounce_1s_infinite_0.4s]"></div>
              </div>

              {/* Optional subtle text */}
              <span className="text-xs font-medium text-gray-500">
                Loading messages...
              </span>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-gray-400">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <p className="text-gray-400">No messages yet</p>
              <p className="text-sm text-gray-500">
                Start your conversation with "
                {user.contact_name.slice(0, 1).toUpperCase() +
                  user.contact_name.slice(1)}
                "
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.$id}
              className={`flex ${
                msg.sender_id === userData.$id ? "justify-end" : "justify-start"
              } mb-4 px-2`}
            >
              <div className="relative max-w-[85%]">
                {/* Message bubble */}
                <div
                  className={`relative rounded-md overflow-hidden z-50 shadow-sm ${
                    msg.sender_id === userData.$id
                      ? "bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-tr-none"
                      : "bg-indigo-100 text-gray-800 rounded-tl-none "
                  }`}
                >
                  {/* Message content */}
                  {msg.type === "image" ? (
                    <div className="relative  overflow-hidden">
                      <div className="overflow-hidden ">
                        <img
                          src={chatService.getImg(msg.message)}
                          alt="Chat image"
                          className="max-w-[280px] md:max-w-[320px] h-auto object-cover "
                        />
                      </div>
                      {/* Timestamp for images - bottom right corner */}
                      <div className="absolute bottom-1 right-1  rounded-full ">
                        <span className="text-[10px] text-white">
                          {new Date(msg.$createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative  flex gap-4 px-2 py-1 rounded-2xl">
                      <p className="text-sm py-1">{msg.message}</p>
                      {/* Timestamp for text - right side */}

                      <span
                        className={`text-[10px] self-end  ${
                          msg.sender_id === userData.$id
                            ? "text-purple-100/90"
                            : "text-gray-500"
                        }`}
                      >
                        {new Date(msg.$createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Corner triangle */}
                <div
                  className={`absolute top-0 w-3 h-3 ${
                    msg.sender_id === userData.$id
                      ? "right-0 transform translate-x-1/2 -mr-px"
                      : "left-0 transform -translate-x-1/2 -ml-px w-5"
                  }`}
                >
                  <svg
                    viewBox="0 0 14 12"
                    className={`${
                      msg.sender_id === userData.$id
                        ? "text-indigo-500"
                        : "text-indigo-100"
                    }`}
                  >
                    <path
                      d={
                        msg.sender_id === userData.$id
                          ? "M0 0 L12 0 L0 12 L0 0"
                          : "M12 0 L0 0 L12 12 L12 0"
                      }
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div ref={messageEndRef} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSubmit(submit)}
        className="p-4 border-t border-gray-200 bg-white"
      >
        <div className="flex items-center space-x-2">
          <label className="cursor-pointer" title="Select Img and Send auto">
            <Paperclip className="w-5 h-5" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImgSend}
            />
          </label>

          <Input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-200 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            {...register("message", { required: "Message is required" })}
          />
          <Button className="p-2 cursor-pointer text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full hover:opacity-90 transition-opacity">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChatBox;
