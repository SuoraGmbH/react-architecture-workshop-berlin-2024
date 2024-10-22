import { useEffect, useState } from "react";
import { fetchCurrentUser, User } from "../Harvest/User/fetchCurrentUser";
import { createAuthenticatedHarvestClient } from "../Harvest/harvestClient";

const authenticatedHarvestClient = createAuthenticatedHarvestClient();

export const UserAvatar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchCurrentUser(authenticatedHarvestClient).then(setUser);
  }, []);

  if (!user) {
    return null;
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative flex items-center space-x-2">
      <img
        className="w-8 h-8 rounded-full cursor-pointer"
        src={user.avatar_url}
        alt={`${user.first_name} ${user.last_name}`}
        onClick={toggleDropdown}
      />
      <span
        className="text-gray-300 font-medium hidden lg:block cursor-pointer"
        onClick={toggleDropdown}
      >
        {user.first_name}
      </span>
      <div className="relative">
        <div
          className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 ${
            isDropdownOpen ? "block" : "hidden"
          }`}
        >
          <button
            onClick={() => {
              localStorage.removeItem("harvestAccountId");
              localStorage.removeItem("harvestAccessToken");
              window.location.reload();
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
