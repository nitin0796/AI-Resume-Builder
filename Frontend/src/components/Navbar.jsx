// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const user = { name: "John Doe" };
//   const navigate = useNavigate();

//   const logoutUser = () => {
//     navigate("/");
//   };
//   return (
//     <div className="shadow bg-white">
//       <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-2 text-slate-800 transition-all">
//         <Link to="/">
//           <img src="./logo.png" alt="logo" className="h-11 w-auto" />
//         </Link>
//         <div className="flex items-center gap-4 text-sm">
//           <p className="max-sm:hidden">Hi, {user.name}</p>
//           <button
//             onClick={logoutUser}
//             className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LogOut, User, FileText, Settings } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const user = { name: "John Doe", email: "john@example.com" };
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const logoutUser = () => {
    navigate("/");
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
        {/* Logo */}
        <Link
          to="/app"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center gap-2">
            <Link to="/app">
              <img
                src="./logo.png"
                alt="ResumeForge Logo"
                className="h-12 md:h-14"
              />
            </Link>
          </div>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* User Info - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-50 to-green-500 flex items-center justify-center text-white font-semibold shadow-md">
              {user.name.charAt(0)}
            </div>
          </div>

          {/* User Avatar - Mobile (with dropdown) */}
          <div className="md:hidden relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              {user.name.charAt(0)}
            </button>

            {/* Mobile Dropdown */}
            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => {
                        navigate("/app");
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <FileText className="size-4" />
                      <span className="text-sm font-medium">My Resumes</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Settings className="size-4" />
                      <span className="text-sm font-medium">Settings</span>
                    </button>
                  </div>

                  <div className="p-2 border-t border-gray-200">
                    <button
                      onClick={() => {
                        logoutUser();
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="size-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Logout Button - Desktop */}
          <button
            onClick={logoutUser}
            className="hidden md:flex items-center gap-2 bg-white hover:bg-red-50 border-2 border-gray-300 hover:border-red-300 text-gray-700 hover:text-red-600 px-5 py-2 rounded-lg font-medium transition-all active:scale-95 shadow-sm hover:shadow-md"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
