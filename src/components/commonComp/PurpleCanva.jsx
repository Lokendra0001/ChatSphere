import React from "react";

export default function PurpleCanva({ children }) {
  return (
    <div className="max-w-[1400px] min-h-[605px] bg-slate-50 shadow-xl  relative overflow-hidden">
      {/* Decorative top left shape */}
      <div className="absolute top-[-30px] left-[-30px] w-32 h-32 bg-purple-200 rounded-xl rotate-12 opacity-80"></div>

      {/* Decorative bottom left shape */}
      <div className="absolute bottom-[-30px] left-[-20px] w-40 h-40 bg-purple-300 rounded-xl rotate-45 opacity-80"></div>

      {/* Decorative top right shape */}
      <div className="absolute top-[-20px] right-[-18px] w-36 h-36 bg-purple-400 rounded-xl -rotate-12 opacity-80"></div>

      <div className="relative z-10 md:px-7 px-3 py-5 flex justify-center items-center min-h-[605px]">
        {children}
      </div>
    </div>
  );
}
