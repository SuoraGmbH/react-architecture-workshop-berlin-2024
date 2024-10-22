import { Link } from "react-router-dom";
import { routes } from "../routes";
import { CurrentActiveTimeEntry } from "./CurrentActiveTimeEntry.tsx";
import { UserAvatar } from "./UserAvatar.tsx";

export const Navbar = () => {
  return (
    <nav>
      <div className="bg-gray-800 h-16">
        <div className="container mx-auto flex items-center">
          <div className="flex items-center p-4">
            <Link
              to="/"
              className="text-white font-bold text-xl hidden lg:block"
            >
              Harvest Thingy
            </Link>
            <Link to="/" className="text-white font-bold text-xl lg:hidden">
              🏠
            </Link>

            <ul className="flex space-x-4 items-center ml-4">
              {routes
                .filter((route) => !route.hideInNavbar)
                .map((route) => {
                  if (!route.path || route.path === "/") {
                    return null;
                  }

                  return (
                    <li key={route.path}>
                      <Link
                        to={route.path}
                        className="text-gray-300 hover:text-white transition duration-300"
                      >
                        {route.path.charAt(1).toUpperCase() +
                          route.path.slice(2)}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="flex-1"></div>
          <div className="hidden lg:block">
            <CurrentActiveTimeEntry />
          </div>
          <UserAvatar />
        </div>
      </div>
    </nav>
  );
};
